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

async function getAuthUser(req,res){
  const {user} = req;
  try{
    const userImages = await UserModel.getUserImages(user._id);
    const userObject = user.toJSON();
    userObject.images = userImages;
    res.send(userObject);
  }catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function updateAuthUser(req,res){

  // profileImage is base64 encoded picture which will be stored as string in db
  const {profileImage}= req.body;
  if(!profileImage) return res.sendStatus(400);
  try{
    await UserModel.findByIdAndUpdate(req.user._id,{profileImage});
    res.sendStatus(200);
  } catch(e) {

    console.log(e);
    res.sendStatus(500);
  }
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
    const user = await UserModel.findOne({email});
    res.sendStatus(user ? 400 : 200);
  }catch(e) {
    res.sendStatus(500);
  }
 }

 async function isUserNameAvailable (req,res) {

  const {userName} = req.params;

  try{ 
    const user = await UserModel.findOne({userName});
    res.sendStatus(user ? 400 : 200);
    
  }catch(e) {
    res.sendStatus(500);
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
}