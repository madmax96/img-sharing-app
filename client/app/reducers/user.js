import { ACTION_NAMES } from '../actions/actionCreators';

const {
  ADD_IMAGE, DELETE_IMAGE,
  SET_PROFILE_IMAGE,
  USER_LOGIN, USER_LOGOUT,
} = ACTION_NAMES;

const userDefaultState = {
  _id: '',
  email: '',
  fullName: '',
  userName: '',
  profileImage: '',
  images: [],
};

function user(state = userDefaultState, action) {
  switch (action.type) {
    case ADD_IMAGE:
      return { ...state, images: [action.image, ...state.images] };
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter(image => image._id !== action.imageId),
      };
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.imageData,
      };
    case USER_LOGIN:
      return action.user;
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export default user;
