export const ACTION_NAMES = {
  ADD_IMAGE: 'ADD_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
  LIKE_UNLIKE_IMAGE: 'LIKE_UNLIKE_IMAGE',
  NEW_IMAGES_FETCHED_INDEX: 'NEW_IMAGES_FETCHED_INDEX',
  NEW_IMAGES_FETCHED_USER: 'NEW_IMAGES_FETCHED_USER',
  SET_PROFILE_IMAGE: 'SET_PROFILE_IMAGE',
  ADD_USER_INFO: 'ADD_USER_INFO',
};

export function addImage(image) {
  return {
    type: ACTION_NAMES.ADD_IMAGE,
    image,
  };
}

export function setProfileImage(imageData, userId) {
  return {
    type: ACTION_NAMES.SET_PROFILE_IMAGE,
    imageData,
    userId,
  };
}
export function deleteImage(image) {
  return {
    type: ACTION_NAMES.DELETE_IMAGE,
    image,
  };
}


export function likeUnlikeImage(image) {
  return {
    type: ACTION_NAMES.LIKE_UNLIKE_IMAGE,
    image,
  };
}

export function newImagesFetchedIndex(images) {
  return {
    type: ACTION_NAMES.NEW_IMAGES_FETCHED_INDEX,
    images,
  };
}

export function newImagesFetchedUser(images, userId) {
  return {
    type: ACTION_NAMES.NEW_IMAGES_FETCHED_USER,
    images,
    userId,
  };
}

export function addUserInfo(user) {
  return {
    type: ACTION_NAMES.ADD_USER_INFO,
    user,
  };
}
