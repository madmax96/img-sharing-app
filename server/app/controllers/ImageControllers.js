
const fs = require('fs');
const util = require('util');
const mongoose = require('mongoose');
const ImageModel = require('../models/ImageModel');
const UserModel = require('../models/UserModel');

fs.unlink = util.promisify(fs.unlink);


async function getImages(req,res){

    let {page, perPage} = req.params;
    
    page = +page;
    perPage= +perPage;

    if (Number.isNaN(page) || Number.isNaN(perPage)) {
        return res.sendStatus(400);
    }
    try {
        let images = await ImageModel.getImages({page,perPage});
        images = images.map(image => image.toJSON());
        const userPromises = images.map(image => image.userId).map(userId => UserModel.findById(userId));
        const users = await Promise.all(userPromises);
        images.forEach((image,i)=>{
            image.user = users[i];
        });
        res.send(images);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function getImage(req,res){

    let {url} = req.params;
    const readStream = fs.createReadStream(`uploads/${url}`);
    readStream.on('error',() => res.sendStatus(404));
    readStream.pipe(res);
}

async function getImageLikes(req,res){

    let {imageId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(imageId)){
        return res.sendStatus(400);
      }
    const image = await ImageModel.findById(imageId);
    if(!image) return res.sendStatus(404);
    const {likedBy} = image;
    const users = await Promise.all(likedBy.map(userId => UserModel.findById(userId)));
    res.send(users);
}
// changing of  description or liking 

async function updateImage(req,res){
    const { description, like, unlike } = req.body;

    if(!description && !like && !unlike) {
        return res.sendStatus(400);
    }

    const { imageId } = req.params;
    const { user } = req;
    const { _id:userId } = user;

    if(like){
        try {
            await ImageModel.like({imageId,userId});
            return res.sendStatus(200);
        }catch(e){
            console.log(e);
            return res.sendStatus(e.statusCode);
        }
    }

    if(unlike){
        try {
            await ImageModel.unlike({imageId,userId});
            return res.sendStatus(200);
        }catch(e){
            console.log(e);
            return res.sendStatus(e.statusCode);
        }
    }

    if(description){
        try {
            await ImageModel.changeDescription({imageId,userId,description});
            res.sendStatus(200);
        } catch(e) {
            console.log(e);
            res.sendStatus(e.statusCode);
        }
    }

}

async function crateImage(req,res){
    const {imageDescription} = req.body;
    const {storedFileName} = req;
    const image = {
        description:imageDescription,
        url: storedFileName,
        userId:req.user._id
    }
    try {
        const created =  await ImageModel.create(image);
        return res.send(created);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
}

async function deleteImage(req,res){

    const { imageId } = req.params;
    if(!mongoose.Types.ObjectId.isValid(imageId)){
        return res.sendStatus(400);
      }
    const image = await ImageModel.findById(imageId);
    if(!image){
        return res.sendStatus(404);
    }
    if(image.userId.toString() !== req.user._id.toString()){
        return res.sendStatus(403);
    }
    try{
        await image.delete();
        await fs.unlink(`uploads/${image.url}`);
        res.sendStatus(200);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }


}

module.exports = {getImages,getImage,getImageLikes,updateImage,crateImage,deleteImage};