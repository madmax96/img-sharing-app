import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Config from '../../../../config';
import { newImagesFetched as newImagesFetchedAction } from '../../../../actions/actionCreators';
import Navbar from './Navbar';
import StyledText from '../../../UI/StyledText';
import Loader from '../../../UI/Loader';
import ImagePostsContainer from './ImagePostsContainer';

const { API_URL } = Config;

const UserPage = ({ user, newImagesFetched, images }) => {
  const [loader, setLoader] = useState(!images.length);
  useEffect(() => {
    if (images.length) return;
    axios.get(`${API_URL}/images/1/10`, { headers: { 'x-auth': user.token } })
      .then((response) => {
        const newImages = response.data;
        newImages.forEach((image) => {
          image.likedByMe = image.likedBy.includes(user._id);
        });
        newImagesFetched(newImages);
        setLoader(false);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div>
      <Navbar />
      <div className="text-center">
        <StyledText className="mt-5">Newest Posts</StyledText>
      </div>
      <div className="text-center">
        {loader ? <Loader /> : <ImagePostsContainer images={images} />}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  images: state.images,
});
const mapDispatchToProps = dispatch => ({
  newImagesFetched: images => dispatch(newImagesFetchedAction(images)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
