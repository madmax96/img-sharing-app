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
        <NavLink to={`/users/${userName}`} className="mr-auto pl-1">{userName}</NavLink>
        <button type="button" className="btn btn-sm btn-outline-info mr-1">Download</button>
      </ImagePostUI.Header>
      <ImagePostUI.Image src={`${API_URL}/image/${url}?xAuth=${localStorage.getItem('token')}`} />
      <ImagePostUI.Footer>
        <div className=" h-100">
          <div className=" d-flex align-items-center">
            <span style={{ cursor: 'pointer' }} onClick={() => likeImage(_id)}>
              <FaHeart className="mx-2" color={likedByMe ? '#B83439' : 'grey'} />
            </span>
            <span className="text-primary">{likedBy.length}</span>
            <button type="button" className=" btn btn-sm btn-default ml-auto pr-2 text-primary">likes</button>
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
  likeImage: (id) => {
    dispatch(likeImage(id));
  },
});

export default connect(null, mapDispatchToProps)(ImagePost);
