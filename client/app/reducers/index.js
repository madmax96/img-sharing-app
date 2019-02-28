import { ACTION_NAMES } from '../actions/actionCreators';

const {
  ADD_IMAGE, DELETE_IMAGE,
  SET_PROFILE_IMAGE,
  LIKE_UNLIKE_IMAGE,
  NEW_IMAGES_FETCHED_INDEX,
  NEW_IMAGES_FETCHED_USER,
  ADD_USER_INFO,
} = ACTION_NAMES;

/**
 *
 * @param {Object} state
 * @param {Object} state.users
 * @param {Array} state.indexImages
 * @param {Object} action
 */
function rootReducer(state, action) {
  switch (action.type) {
    case ADD_USER_INFO: {
      const { user } = action;
      const { _id: userId } = user;
      return {
        users: {
          ...state.users,
          [userId]: user,
        },
        indexImages: state.indexImages,
      };
    }
    case ADD_IMAGE: {
      const { image } = action;
      const { _id: userId } = image.user;
      return {
        users: {
          ...state.users,
          [userId]: {
            ...state.users[userId],
            images: [image, ...state.users[userId].images],
          },
        },
        indexImages: [image, ...state.indexImages],
      };
    }
    case DELETE_IMAGE: {
      const { image } = action;
      const { _id: imageId } = image;
      const { _id: userId } = image.user;
      return {
        indeximages: state.indexImages.filter(image => image._id !== imageId),
        users: {
          ...state.users,
          [userId]: {
            ...state.users[userId],
            images: state.users[userId].images.filter(image => image._id !== imageId),
          },
        },
      };
    }
    case SET_PROFILE_IMAGE: {
      const { imageData, userId } = action;
      return {
        indexImages: state.indexImages,
        users: {
          ...state.users,
          [userId]: {
            ...state.users[userId],
            profileImage: imageData,
          },
        },
      };
    }

    case LIKE_UNLIKE_IMAGE: {
      const { image } = action;
      const { _id: imageId } = image;
      const { _id: userId } = image.user;
      return {
        users: {
          ...state.users,
          [userId]: {
            ...state.users[userId],
            images: state.users[userId].images.map((image) => {
              if (image._id === imageId) {
                return {
                  ...image,
                  likedByMe: !image.likedByMe,
                };
              }
              return image;
            }),
          },
        },
        indexImages: state.indexImages.map((image) => {
          if (image._id === imageId) {
            return {
              ...image,
              likedByMe: !image.likedByMe,
            };
          }
          return image;
        }),
      };
    }

    case NEW_IMAGES_FETCHED_INDEX:
      return {
        users: state.users,
        indexImages: [...state.indexImages, ...action.images],
      };
    case NEW_IMAGES_FETCHED_USER: {
      const { userId, images } = action;
      return {
        users: {
          ...state.users,
          [userId]: {
            ...state.users[userId],
            images: [...state.users[userId].images, ...images],
          },
        },
        indexImages: state.indexImages,
      };
    }
    default:
      return state;
  }
}

export default rootReducer;
