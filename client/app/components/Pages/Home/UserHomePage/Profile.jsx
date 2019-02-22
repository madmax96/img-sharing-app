import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Config from '../../../../config';
import { newImagesFetched as newImagesFetchedAction } from '../../../../actions/actionCreators';
import Navbar from './Navbar';
import StyledText from '../../../UI/StyledText';
import Loader from '../../../UI/Loader';
import ImagePostsContainer from './ImagePostsContainer';

const { API_URL } = Config;

const Profile = ({ user, match }) => {
  if (!user.token) return null;
  const { userName } = match.params;
  // if (userName === user.userName) return <Redirect to="/ses" />;
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios.get(`${API_URL}/users/${userName}`, { headers: { 'x-auth': user.token } })
      .then((response) => {
        setUserData(response.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, [userName]);


  return (
    <div>
      <Navbar />
      <div className="text-center">
        {loader ? <Loader /> : <ImagePostsContainer images={userData.images} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
