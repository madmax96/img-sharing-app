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
      const { userName } = user;
      return {
        users: {
          ...state.users,
          [userName]: user,
        },
        indexImages: state.indexImages,
      };
    }
    case ADD_IMAGE: {
      const { image } = action;
      const { userName } = image.user;
      return {
        users: {
          ...state.users,
          [userName]: {
            ...state.users[userName],
            images: [image, ...state.users[userName].images],
          },
        },
        indexImages: [image, ...state.indexImages],
      };
    }
    case DELETE_IMAGE: {
      const { image } = action;
      const { _id: imageId } = image;
      const { userName } = image.user;
      return {
        indeximages: state.indexImages.filter(image => image._id !== imageId),
        users: {
          ...state.users,
          [userName]: {
            ...state.users[userName],
            images: state.users[userName].images.filter(image => image._id !== imageId),
          },
        },
      };
    }
    case SET_PROFILE_IMAGE: {
      const { imageData, userName } = action;
      return {
        indexImages: state.indexImages,
        users: {
          ...state.users,
          [userName]: {
            ...state.users[userName],
            profileImage: imageData,
          },
        },
      };
    }

    case LIKE_UNLIKE_IMAGE: {
      const { image } = action;
      const { _id: imageId } = image;
      const { userName } = image.user;
      const newState = {
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
      if (state.users[userName]) {
        newState.users = {
          ...state.users,
          [userName]: {
            ...state.users[userName],
            images: state.users[userName].images.map((image) => {
              if (image._id === imageId) {
                return {
                  ...image,
                  likedByMe: !image.likedByMe,
                };
              }
              return image;
            }),
          },
        };
      } else {
        newState.users = state.users;
      }
      return newState;
    }

    case NEW_IMAGES_FETCHED_INDEX:
      return {
        users: state.users,
        indexImages: [...state.indexImages, ...action.images],
      };
    case NEW_IMAGES_FETCHED_USER: {
      const { userName, images } = action;
      return {
        users: {
          ...state.users,
          [userName]: {
            ...state.users[userName],
            images: [...state.users[userName].images, ...images],
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
