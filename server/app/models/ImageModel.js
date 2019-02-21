const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

let ImageSchema = new Schema({
  userId: {type:ObjectId,required:true},
  url: {
    type: String,
    required: true,
  },
  description: String,
  likedBy:[ObjectId],
});

ImageSchema.index({user:1});
ImageSchema.index({url:1,user:1});

ImageSchema.statics.getImages = ({page, perPage}) => ImageModel.find().sort({_id:-1}).skip((page-1) * perPage).limit(perPage);

ImageSchema.statics.changeDescription = async ({imageId,userId,description})=>{

  if(!mongoose.Types.ObjectId.isValid(imageId)){
    return Promise.reject({statusCode:400});
  }
    const image = await ImageModel.findById(imageId);
    if(!image){
      return Promise.reject({statusCode:404})
    }
    if(image.userId.toString() !== userId.toString()){
      return Promise.reject({statusCode:401});
    }

    return image.update({description});

}

ImageSchema.statics.like = async ({imageId,userId}) => {

  if(!mongoose.Types.ObjectId.isValid(imageId)){
    return Promise.reject({statusCode:400});
  }
  
  const image = await ImageModel.findById(imageId);
  if(!image){
    return Promise.reject({statusCode:404});
  }
  return image.update({$push:{likedBy:userId}});  
}


let ImageModel = mongoose.model('Image', ImageSchema);
module.exports = ImageModel;
