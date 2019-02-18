const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const util = require('util');
const bcryptCompare = util.promisify(bcrypt.compare);
const ImageModel = require('./ImageModel');
const JWT_SECRET = 'super secret';

let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  fullName: {type:String,required:true},
  userName: {type:String,required:true},
  profileImage:String,
  password: {
    type: String,
    require: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});
UserSchema.index({ email:1 });
UserSchema.index({ email:1, userName:1 });

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, JWT_SECRET).toString();

  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};


UserSchema.statics.findByToken = function (token) {
 
  let decoded;

  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return UserModel.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    const { password, tokens, __v, ...toSend } = userObject;
    return toSend;
  };

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await UserModel.findOne({email});
  const isMatch = await bcryptCompare(password,user.password);
  if(!isMatch) throw new Error('Password is not correct');
  return user;
};


UserSchema.statics.getUserImages = userId => ImageModel.find({userId})

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};


UserSchema.pre('save',function(next){
  let user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});

let UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel
