import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import HoverableImage from '../../../UI/HoverableImage';
import PlaceholderImg from '../../../../../../public/img/placeholder.png';

export default ({
  profileImage, userName, fullName, totalLikes, totalPosts, email, isMineProfile, onProfileIconClick, onAddImageClick,
}) => {
  const Image = <img src={profileImage || PlaceholderImg} alt="user profile " className=" mt-4 img-fluid img-thumbnail h-100" style={{ borderRadius: '50%' }} />;
  const HoverContent = (
    <div className="d-flex h-100 align-items-center justify-content-center">
      {<FaPlusCircle size={80} />}
    </div>
  );
  return (
    <div className="row align-items-center h-100 justify-content-center ">
      <div className="col-6 col-lg-3 h-75">
        {isMineProfile
          ? (
            <HoverableImage
              onClick={onProfileIconClick}
              data-toggle="modal"
              data-target="#uploadImage"
              image={Image}
              content={HoverContent}
            />
          ) : Image}
      </div>
      <div className="col-6 col-lg-4 mt-4">
        <p>{userName}</p>
        <p>{fullName}</p>
        <p>{email}</p>
        <p>{totalPosts}</p>
        <p>{totalLikes}</p>
      </div>
      {isMineProfile ? (
        <div className="col-12 col-lg-1">
          <FaPlusCircle
            data-toggle="modal"
            data-target="#uploadImage"
            className="text-primary"
            size="100"
            style={{ cursor: 'pointer' }}
            onClick={onAddImageClick}
          />
        </div>
      ) : null}
    </div>
  );
};