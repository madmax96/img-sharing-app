import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Config from '../../../../config';
import { newImagesFetched as newImagesFetchedAction } from '../../../../actions/actionCreators';
import Navbar from './Navbar';
import StyledText from '../../../UI/StyledText';
import ImagePost from './ImagePost';

const Full = styled.div`
height: 100%;
width:100%;
background-color:darkred;
`;

const { API_URL } = Config;

const UserPage = ({ user, newImagesFetched, images }) => {
  useEffect(() => {
    if (images.length) return;
    axios.get(`${API_URL}/images/1/5`, { headers: { 'x-auth': user.token } })
      .then((response) => {
        const newImages = response.data;
        newImages.forEach((image) => {
          image.likedByMe = image.likedBy.includes(user._id);
        });
        newImagesFetched(newImages);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className="text-center">
      <Navbar />
      <StyledText className="mt-5">Newest Posts</StyledText>
      <div className="row mt-2 w-100 px-md-1 px-lg-2 mx-auto justify-content-center">
        {images.map(image => (
          <div
            className="col col-11 col-md-5 col-lg-3 mb-4 mr-1 text-center"
            key={image._id}
          >
            <ImagePost {...image} />

          </div>
        ))}
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
