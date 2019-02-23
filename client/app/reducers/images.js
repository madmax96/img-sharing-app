import { ACTION_NAMES } from '../actions/actionCreators';

const {
  LIKE_IMAGE, LIKE_UNLIKE_IMAGE, NEW_IMAGES_FETCHED, DELETE_IMAGE_INDEX, ADD_IMAGE_INDEX,
} = ACTION_NAMES;


function images(state = [], action) {
  switch (action.type) {
    case LIKE_IMAGE:
      return state.map((image) => {
        if (image._id == action.imageId) {
          return { ...image, likedByMe: true };
        }
        return image;
      });
    case DELETE_IMAGE_INDEX:
      return state.filter(image => image._id !== action.imageId);
    case ADD_IMAGE_INDEX:
      return [action.image, ...state];
    case LIKE_UNLIKE_IMAGE:
      return state.map((image) => {
        if (image._id === action.imageId) {
          return {
            ...image,
            likedBy: image.likedByMe ? image.likedBy.slice(0, -1) : [...image.likedBy, 'me'],
            likedByMe: !image.likedByMe,
          };
        }
        return image;
      });

    case NEW_IMAGES_FETCHED:
      return [...state, ...action.images];
    default:
      return state;
  }
}

export default images;
