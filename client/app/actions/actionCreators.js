// increment
export const ACTION_NAMES = {
  ADD_IMAGE: 'ADD_IMAGE',
  ADD_IMAGE_INDEX: 'ADD_IMAGE_INDEX',
  DELETE_IMAGE: 'DELETE_IMAGE',
  DELETE_IMAGE_INDEX: 'DELETE_IMAGE_INDEX',
  LIKE_UNLIKE_IMAGE: 'LIKE_UNLIKE_IMAGE',
  LIKE_UNLIKE_IMAGE_PROFILE: 'LIKE_UNLIKE_IMAGE_PROFILE',
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

export function addImageIndex(image) {
  return {
    type: ACTION_NAMES.ADD_IMAGE_INDEX,
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

export function deleteImageIndex(imageId) {
  return {
    type: ACTION_NAMES.DELETE_IMAGE_INDEX,
    imageId,
  };
}


export function likeUnlikeImage(imageId) {
  return {
    type: ACTION_NAMES.LIKE_UNLIKE_IMAGE,
    imageId,
  };
}

export function likeUnlikeImageProfile(imageId) {
  return {
    type: ACTION_NAMES.LIKE_UNLIKE_IMAGE_PROFILE,
    imageId,
  };
}

export function newImagesFetched(images) {
  return {
    type: ACTION_NAMES.NEW_IMAGES_FETCHED,
    images,
  };
}
