import React, { useState, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ImagePostUI from '../UI/ImagePost';
import Config from '../../config';
import UserContext from '../../UserContext';
import {
  likeUnlikeImage, deleteImage,
} from '../../actions/actionCreators';
import placeholderImg from '../../../../public/img/placeholder.png';

const { API_URL } = Config;

const ImagePost = ({
  likedBy, _id, description, url, user, likedByMe, likeUnlikeImage, showDeleteButton, deleteImage, users,
}) => {
  const {
    _id: imageUserId, email, fullName, userName: imageUserName, profileImage,
  } = user;
  const [likes, toggleLikesSection] = useState(false);
  const { token, userName, userId } = useContext(UserContext);
  const thisUser = users[userName];
  const fetchLikes = () => {
    if (likes) return toggleLikesSection(false);
    axios.get(`${API_URL}/image/${_id}/likes`, { headers: { 'x-auth': token } })
      .then((response) => {
        const users = response.data;
        toggleLikesSection(users);
      }).catch((err) => {
        console.log(err);
        alert('Something is wrong. Please try later');
      });
  };
  const _deleteImage = () => {
    axios.delete(`${API_URL}/images/${_id}`, { headers: { 'x-auth': token } })
      .then(() => {
        deleteImage(_id);
      }).catch((err) => {
        console.log(err);
        alert('Something is wrong. Please try later');
      });
  };
  const _likeUnlikeImage = () => {
    axios.patch(`${API_URL}/images/${_id}`, { [likedByMe ? 'unlike' : 'like']: true }, { headers: { 'x-auth': token } })
      .then(() => {
        likeUnlikeImage({
          likedBy, _id, description, url, user, likedByMe,
        });
      }).catch((err) => {
        console.log(err);
        alert('Something is wrong. Please try later');
      });
  };
  return (
    <ImagePostUI>
      <ImagePostUI.Header>
        <ImagePostUI.Header.Img
          src={imageUserId === userId ? thisUser.profileImage : (profileImage || placeholderImg)}
        />

        <NavLink to={`/users/${imageUserName}`} className="mr-auto pl-1">{imageUserName}</NavLink>
        <a target="_blank" download={url} href={`${API_URL}/image/${url}?xAuth=${token}`} className="btn btn-sm btn-outline-info mr-1">Download</a>
        {showDeleteButton ? (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger mr-1"
            onClick={() => _deleteImage()}
          >
          Delete
          </button>
        ) : null}
      </ImagePostUI.Header>
      {likes ? (
        <ImagePostUI.Content>
          <div className="h-100 align-items-center jusify-content-center d-flex flex-column">
            <h4 className="text-primary my-3">Likes</h4>

            {likes.map(user => (
              <div>
                <ImagePostUI.Header.Img
                  src={user.profileImage}
                />
                <NavLink to={`/users/${user.imageUserName}`} className="mr-auto pl-1">{user.imageUserName}</NavLink>
              </div>
            ))}
          </div>

        </ImagePostUI.Content>
      )
        : <ImagePostUI.Image src={`${API_URL}/image/${url}?xAuth=${token}`} /> }
      <ImagePostUI.Footer>
        <div className=" h-100">
          <div className=" d-flex align-items-center">
            {imageUserId !== userId ? (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => _likeUnlikeImage()}
              >
                <FaHeart className="ml-2" color={likedByMe ? '#B83439' : 'grey'} />
              </span>
            ) : null}
            <span className="text-primary ml-2">{likedBy.length}</span>
            <button type="button" className=" btn btn-sm btn-default ml-auto pr-2 text-primary" onClick={fetchLikes}>likes</button>
          </div>
          <div className="text-left px-2 text-wrap">
            <small className="small text-primary">{description}</small>
          </div>
        </div>
      </ImagePostUI.Footer>
    </ImagePostUI>
  );
};

const mapDispatchToProps = dispatch => ({
  likeUnlikeImage: (image) => {
    dispatch(likeUnlikeImage(image));
  },
  deleteImage: (image) => {
    dispatch(deleteImage(image));
  },
});
const mapStateToProps = state => ({ users: state.users });
export default connect(mapStateToProps, mapDispatchToProps)(ImagePost);
