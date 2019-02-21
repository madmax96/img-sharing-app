// increment
export const ACTION_NAMES = {
  ADD_IMAGE: 'ADD_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
  LIKE_IMAGE: 'LIKE_IMAGE',
  UNLIKE_IMAGE: 'UNLIKE_IMAGE',
  NEW_IMAGES_FETCHED: 'NEW_IMAGES_FETCHED',
  SET_PROFILE_IMAGE: 'SET_PROFILE_IMAGE',
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
};


export function userLogin(user) {
  return {
    type: ACTION_NAMES.USER_LOGIN,
    user,
  };
}

export function userLogout() {
  return {
    type: ACTION_NAMES.USER_LOGOUT,
  };
}

export function addImage(image) {
  return {
    type: ACTION_NAMES.ADD_IMAGE,
    image,
  };
}

export function setProfileImage(imageData) {
  return {
    type: ACTION_NAMES.SET_PROFILE_IMAGE,
    imageData,
  };
}
export function deleteImage(imageId) {
  return {
    type: ACTION_NAMES.DELETE_IMAGE,
    imageId,
  };
}

export function likeImage(imageId) {
  return {
    type: ACTION_NAMES.LIKE_IMAGE,
    imageId,

  };
}

export function unlikeImage(imageId) {
  return {
    type: ACTION_NAMES.UNLIKE_IMAGE,
    imageId,
  };
}


export function newImagesFetched(images) {
  return {
    type: ACTION_NAMES.NEW_IMAGES_FETCHED,
    images,
  };
}
