const UserModel = require('../models/UserModel');

async function registerUser(req,res){

    try {
        let user = new UserModel(req.body);
        await user.save()
        await user.generateAuthToken();
        res.sendStatus(200);
      } catch(e) {
        console.log(e);
        res.sendStatus(400);
      }

}

async function loginUser(req,res){

    const { email,password } = req.body;
    try { 
      const user = await UserModel.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      const userImages = await UserModel.getUserImages(user._id);
      const userObject = user.toJSON();
      userObject.images = userImages;
      res.header('x-auth', token).send(userObject);
    } catch(e){
      res.sendStatus(400);
    }

}

 function logoutUser(req,res){
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
      }, () => {
        res.status(400).send();
      });
}

function getAuthUser(req,res){
    res.send(req.user);
}

function updateAuthUser(req,res){
 // TODO
}


function setProfilePicture(req,res){
  // TODO
 }

async function getUser(req,res){

  const { userName } = req.params;

  try { 
    const user = await UserModel.findOne({userName});
    if(!user){
      return res.sendStatus(404);
    }
    const userImages = await UserModel.getUserImages(user._id);
    const userObject = user.toJSON();
    userObject.images = userImages;
    res.send(userObject);
  } catch(e){
    console.log(e)
    res.sendStatus(400);
  }
  
}

async function isEmailAvailable (req,res) {

  const { email } = req.params;
  try{ 
    await UserModel.find({ email });
    res.sendStatus(400);
  }catch(e) {
    res.sendStatus(200);
  }
 }

 async function isUserNameAvailable (req,res) {

  const {userName} = req.params;

  try{ 
    await UserModel.find({userName});
    res.sendStatus(400);
  }catch(e) {
    res.sendStatus(200);
  }
 }

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getAuthUser,
  isEmailAvailable,
  isUserNameAvailable,
  getUser,
  updateAuthUser,
  setProfilePicture
}