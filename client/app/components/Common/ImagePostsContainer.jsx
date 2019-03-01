import React from 'react';
import ImagePost from './ImagePost';

export default ({ images, imagesUser, showDeleteButton }) => (
  <div className="container-fluid mt-2 ">
    <div style={{ width: '93%' }} className="row justify-content-around mx-auto">
      {images.map(image => (
        <div
          className="col col-11 col-md-5 col-lg-4 mb-4 text-center"
          key={image._id}
        >
          <ImagePost
            {...image}
            user={image.user || imagesUser}
            showDeleteButton={showDeleteButton}
          />
        </div>
      ))}
    </div>


  </div>
);
