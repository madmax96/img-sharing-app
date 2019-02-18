const ImageModel = require('../models/ImageModel');
const UserModel = require('../models/UserModel');

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

// changing of  description or liking 

async function updateImage(req,res){
    const { description, like } = req.body;

    if(!description && !like) {
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

}

async function deleteImage(req,res){

}

module.exports = {getImages,updateImage,crateImage,deleteImage};