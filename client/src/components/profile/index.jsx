import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUserPhotosByUsername } from '../../services/firebase';
import Photos from './Photos';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0
};

export default function UserProfile({ user }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    };
    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};
