import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Config from '../../../../config';
import Navbar from './Navbar';
import StyledText from '../../../UI/StyledText';
import Loader from '../../../UI/Loader';
import ImagePostsContainer from './ImagePostsContainer';
import ProfileInfo from './ProfileInfo';
import PlaceholderImg from '../../../../../../public/img/placeholder.png';
import encodeImageAsUrl from '../../../../utils/encodeImageAsUrl';
import { setProfileImage, addImage, addImageIndex } from '../../../../actions/actionCreators';

const { API_URL } = Config;

const Profile = ({
  user, match, _setProfileImage, _addImage,
}) => {
  const { userName } = match.params;
  if (userName === user.userName) return <Redirect to="/profile" />;
  const closeModalBtn = useRef(null);
  const isMyProfile = !userName;

  const [loader, setLoader] = useState(!isMyProfile);
  const [isUploadImageModal, changeIsUploadImageModal] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [imageDescription, setImageDescription] = useState('');

  const handleImageInputChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (isUploadImageModal) {
      setUploadedImg(image);
    } else {
      encodeImageAsUrl(image).then((data) => {
        setUploadedImg(data);
      });
    }
  };
  const handleImageDescriptionChange = (e) => {
    setImageDescription(e.target.value);
  };
  const handleImageUpload = () => {
    if (isUploadImageModal) {
      const bodyFormData = new FormData();
      bodyFormData.append('image', uploadedImg);
      bodyFormData.append('imageDescription', imageDescription);
      axios({
        method: 'post',
        url: `${API_URL}/images?xAuth=${user.token}`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          const image = response.data;
          image.user = user;
          _addImage(image);
          setImageDescription('');
          setUploadedImg(null);
          closeModalBtn.current.click();
        })
        .catch((response) => {
          alert('Something is wrong, please try later');
          console.log(response);
        });
    } else {
      axios({
        method: 'patch',
        url: `${API_URL}/users/me`,
        data: { profileImage: uploadedImg },
        headers: { 'x-auth': user.token },
      })
        .then(() => {
          _setProfileImage(uploadedImg);
          closeModalBtn.current.click();
          setUploadedImg(null);
        })
        .catch((response) => {
          // handle error
          console.log(response);
        });
    }
  };
  const thisUser = {
    ...user,
    images: user.images
      .map(image => ({ ...image, user, showDeleteButton: true })),
  };
  thisUser.totalPosts = thisUser.images.length;
  thisUser.totalLikes = thisUser.images.reduce((sum, image) => sum + image.likedBy.length, 0);
  thisUser.isMineProfile = true;
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (isMyProfile) return;
    axios.get(`${API_URL}/users/${userName}`, { headers: { 'x-auth': user.token } })
      .then((response) => {
        const imageUser = response.data;
        const userData = { ...imageUser, images: imageUser.images.map(image => ({ ...image, user: imageUser, likedByMe: image.likedBy.includes(user._id) })) };
        userData.totalPosts = userData.images.length;
        userData.totalLikes = userData.images.reduce((sum, image) => sum + image.likedBy.length, 0);
        setUserData(userData);
        setLoader(false);
      })
      .catch((err) => {
        alert('something is wrong');
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="text-center mt-5">
        {loader ? <Loader />
          : (
            <div>
              <div style={{ height: '20rem' }}>
                {isMyProfile ? (
                  <ProfileInfo
                    {...thisUser}
                    onProfileIconClick={() => changeIsUploadImageModal(false)}
                    onAddImageClick={() => changeIsUploadImageModal(true)}
                  />
                )
                  : (
                    <ProfileInfo
                      {...userData}
                    />
                  )}
              </div>
              <ImagePostsContainer
                images={isMyProfile ? thisUser.images : userData.images}
              />
            </div>
          )
        }
      </div>
      <div className="modal fade" id="uploadImage" tabIndex="-1" role="dialog" aria-labelledby="uploadImageLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="uploadImageLabel">{isUploadImageModal ? 'Upload new image' : 'Change profile image'}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <input type="file" accept="image/*" onChange={handleImageInputChange} className="mb-2" />
              <img
                className="img-fluid img-thumbnail"
                src={uploadedImg
                  ? isUploadImageModal ? window.URL.createObjectURL(uploadedImg)
                    : uploadedImg
                  : PlaceholderImg}
                alt="failed to load"
              />
              {isUploadImageModal ? (
                <div className="form-group mt-2">
                  <input type="text" placeholder="Description" className="w-100" value={imageDescription} onChange={handleImageDescriptionChange} />
                </div>
              ) : null}

            </div>
            <div className="modal-footer">
              <button ref={closeModalBtn} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button
                onClick={handleImageUpload}
                disabled={!isUploadImageModal ? !uploadedImg
                  : (!uploadedImg || !imageDescription || imageDescription.length < 5)}
                type="button"
                className="btn btn-primary"
              >
                {isUploadImageModal ? 'Post' : 'Save profile'}

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  images: state.images,
});

const mapDispatchToProps = dispatch => ({
  _setProfileImage: imageData => dispatch(setProfileImage(imageData)),
  _addImage: (image) => {
    dispatch(addImage(image));
    dispatch(addImageIndex(image));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
