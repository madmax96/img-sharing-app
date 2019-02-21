import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ImagePostUI from '../../../UI/ImagePost';
import Config from '../../../../config';
import { likeImage } from '../../../../actions/actionCreators';

const { API_URL } = Config;

const ImagePost = ({
  likedBy, _id, description, url, user, likedByMe, likeImage,
}) => {
  const {
    _id: userId, email, fullName, userName, profileImage,
  } = user || {};
  return (
    <ImagePostUI>
      <ImagePostUI.Header>
        <NavLink to={`/users/${userName}`} className="mr-auto pl-2">{userName}</NavLink>
        <span className="pr-2">{email}</span>
      </ImagePostUI.Header>
      <ImagePostUI.Image src={`${API_URL}/image/${url}?xAuth=${localStorage.getItem('token')}`} />
      <ImagePostUI.Footer>
        <span style={{ cursor: 'pointer' }} onClick={() => likeImage(_id)}>
          <FaHeart className="mx-2" color={likedByMe ? 'red' : 'grey'} />
          <span className="text-info">{likedBy.length}</span>
        </span>
        <span className="pr-2">{description}</span>
      </ImagePostUI.Footer>
    </ImagePostUI>
  );
};

const mapDispatchToProps = dispatch => ({
  likeImage: (id) => {
    dispatch(likeImage(id));
  },
});

export default connect(null, mapDispatchToProps)(ImagePost);
