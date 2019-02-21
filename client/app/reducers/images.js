import { ACTION_NAMES } from '../actions/actionCreators';

const {
  LIKE_IMAGE, UNLIKE_IMAGE, NEW_IMAGES_FETCHED,
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

    case UNLIKE_IMAGE:
      return state.map((image) => {
        if (image._id === action.imageId) {
          return { ...image, likedByMe: false };
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
