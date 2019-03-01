import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Config from '../../../config';
import { newImagesFetchedIndex as newImagesFetchedIndexAction } from '../../../actions/actionCreators';
import UserContext from '../../../UserContext';
import Navbar from '../../Common/Navbar';
import StyledText from '../../UI/StyledText';
import Loader from '../../UI/Loader';
import ImagePostsContainer from '../../Common/ImagePostsContainer';

const { API_URL } = Config;

const UserPage = ({ newImagesFetchedIndex, images }) => {
  const [loader, setLoader] = useState(!images.length);
  const { userId, token } = useContext(UserContext);
  useEffect(() => {
    if (images.length) return;
    axios.get(`${API_URL}/images/1/10`, { headers: { 'x-auth': token } })
      .then((response) => {
        const newImages = response.data;
        newImages.forEach((image) => {
          image.likedByMe = image.likedBy.includes(userId);
        });
        newImagesFetchedIndex(newImages);
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
  images: state.indexImages,
});
const mapDispatchToProps = dispatch => ({
  newImagesFetchedIndex: images => dispatch(newImagesFetchedIndexAction(images)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
