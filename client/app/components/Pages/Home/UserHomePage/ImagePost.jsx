import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ImagePostUI from '../../../UI/ImagePost';
import Config from '../../../../config';
import {
  likeUnlikeImage, deleteImage, deleteImageIndex,
} from '../../../../actions/actionCreators';
import placeholderImg from '../../../../../../public/img/placeholder.png';

const { API_URL } = Config;

const ImagePost = ({
  thisUser, likedBy, _id, description, url, user, likedByMe, likeUnlikeImage, showDeleteButton, deleteImage,
}) => {
  const {
    _id: userId, email, fullName, userName, profileImage,
  } = user;
  const [likes, toggleLikesSection] = useState(false);

  const fetchLikes = () => {
    if (likes) return toggleLikesSection(false);
    axios.get(`${API_URL}/image/${_id}/likes`, { headers: { 'x-auth': thisUser.token } })
      .then((response) => {
        const users = response.data;
        toggleLikesSection(users);
      }).catch((err) => {
        console.log(err);
        alert('Something is wrong. Please try later');
      });
  };
  const _deleteImage = () => {
    axios.delete(`${API_URL}/images/${_id}`, { headers: { 'x-auth': thisUser.token } })
      .then(() => {
        deleteImage(_id);
      }).catch((err) => {
        console.log(err);
        alert('Something is wrong. Please try later');
      });
  };
  const _likeUnlikeImage = () => {
    axios.patch(`${API_URL}/images/${_id}`, { [likedByMe ? 'unlike' : 'like']: true }, { headers: { 'x-auth': thisUser.token } })
      .then(() => {
        likeUnlikeImage(_id);
      }).catch((err) => {
        console.log(err);
        alert('Something is wrong. Please try later');
      });
  };
  return (
    <ImagePostUI>
      <ImagePostUI.Header>
        <ImagePostUI.Header.Img
          src={thisUser._id === userId ? thisUser.profileImage : (profileImage || placeholderImg)}
        />

        <NavLink to={`/users/${userName}`} className="mr-auto pl-1">{userName}</NavLink>
        <a target="_blank" download={url} href={`${API_URL}/image/${url}?xAuth=${thisUser.token}`} className="btn btn-sm btn-outline-info mr-1">Download</a>
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
                <NavLink to={`/users/${user.userName}`} className="mr-auto pl-1">{user.userName}</NavLink>
              </div>
            ))}
          </div>

        </ImagePostUI.Content>
      )
        : <ImagePostUI.Image src={`${API_URL}/image/${url}?xAuth=${localStorage.getItem('token')}`} /> }
      <ImagePostUI.Footer>
        <div className=" h-100">
          <div className=" d-flex align-items-center">
            {thisUser._id !== userId ? (
              <span style={{ cursor: 'pointer' }} onClick={() => _likeUnlikeImage()}>
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
  likeUnlikeImage: (id) => {
    dispatch(likeUnlikeImage(id));
  },
  deleteImage: (id) => {
    dispatch(deleteImage(id));
    dispatch(deleteImageIndex(id));
  },
});
const mapStateToProps = state => ({ thisUser: state.user });
export default connect(mapStateToProps, mapDispatchToProps)(ImagePost);
