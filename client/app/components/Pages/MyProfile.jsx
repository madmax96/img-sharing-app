import React, {
  useContext, useRef, useState, Fragment,
} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import UserContext from '../../UserContext';
import PlaceholderImg from '../../../public/img/placeholder.png';
import encodeImageAsUrl from '../../utils/encodeImageAsUrl';
import Navbar from '../Common/Navbar';
import ImagePostsContainer from '../Common/ImagePostsContainer';
import ProfileInfo from '../Common/ProfileInfo';
import { setProfileImage, addImage } from '../../actions/actionCreators';
import Config from '../../config';

const { API_URL } = Config;

const MyProfile = ({ _setProfileImage, _addImage, users }) => {
  const { userId, token, userName } = useContext(UserContext);
  const [isUploadImageModal, changeIsUploadImageModal] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [imageDescription, setImageDescription] = useState('');
  const closeModalBtn = useRef(null);
  const userData = users[userName];

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
        url: `${API_URL}/images?xAuth=${token}`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          const image = response.data;
          image.user = users[userName];
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
        headers: { 'x-auth': token },
      })
        .then(() => {
          _setProfileImage(uploadedImg, userName);
          closeModalBtn.current.click();
          setUploadedImg(null);
        })
        .catch((response) => {
          // handle error
          console.log(response);
        });
    }
  };
  return (
    <Fragment>
      <Navbar />
      <div className="text-center mt-5">
        <div>
          <div style={{ height: '20rem' }}>
            <ProfileInfo
              onProfileIconClick={() => changeIsUploadImageModal(false)}
              onAddImageClick={() => changeIsUploadImageModal(true)}
              {...userData}
              isMineProfile
            />
          </div>
          <ImagePostsContainer
            images={userData.images}
            imagesUser={userData}
            showDeleteButton
          />
        </div>
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
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  _setProfileImage: (imageData, userId) => dispatch(setProfileImage(imageData, userId)),
  _addImage: image => dispatch(addImage(image)),
});
const mapStateToProps = state => ({
  users: state.users,
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
