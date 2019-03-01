import React, {
  useEffect, useState, Fragment, useContext,
} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Config from '../../config';
import Navbar from '../Common/Navbar';
import Loader from '../UI/Loader';
import ImagePostsContainer from '../Common/ImagePostsContainer';
import ProfileInfo from '../Common/ProfileInfo';
import { addUserInfo } from '../../actions/actionCreators';
import UserContext from '../../UserContext';

const { API_URL } = Config;

const Profile = ({
  users, match, addUser,
}) => {
  const { userName } = match.params;
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState({});
  const { token, userName: thisUserName } = useContext(UserContext);

  if (thisUserName === userName) {
    return <Redirect to="/profile" />;
  }
  useEffect(() => {
    if (users[userName]) {
      setUserData(users[userName]);
      return setLoader(false);
    }
    axios.get(`${API_URL}/users/${userName}`, { headers: { 'x-auth': token } })
      .then((response) => {
        const user = response.data;
        const userData = {
          ...user,
          images:
          user.images.map(image => ({
            ...image,
            user,
            likedByMe: image.likedBy.includes(user.userId),
          })),
        };
        userData.totalPosts = userData.images.length;
        userData.totalLikes = userData.images.reduce((sum, image) => sum + image.likedBy.length, 0);
        addUser(userData);
        setUserData(userData);
        setLoader(false);
      })
      .catch((err) => {
        alert('something is wrong');
        console.log(err);
      });
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div className="text-center mt-5">
        {loader ? <Loader />
          : (
            <div>
              <div style={{ height: '20rem' }}>
                <ProfileInfo
                  {...userData}
                />
              </div>
              <ImagePostsContainer
                images={userData.images}
              />
            </div>
          )
        }
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUserInfo(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
