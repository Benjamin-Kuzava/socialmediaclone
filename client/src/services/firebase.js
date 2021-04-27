import { firebase, FieldValue } from '../lib/firebase';

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  // the format of the result object is a little odd
  // map through array of users:
  // there will either be an empty array or an array of one user
  return result.docs.map((user) => user.data().length > 0);
};

export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
};

// get user from the firestore where userId === userId (passed from the auth)
export const getUserByUserId = async (userID) => {
  const result = await firebase.firestore().collection('users').where('userID', '==', userID).get();
  // Optional: pass docId for CRUD operations later on
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
};

// get array of suggested users, not incuding currentUser && users that currentUser is following
export const getSuggestedProfiles = async (userID, following) => {
  const result = await firebase.firestore().collection('users').limit(10).get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userID !== userID && !following.includes(profile.userID));
};

// update the following array of logged in user
// toggle following state based on isFollowingProfile param
export const updateFollowingArray = async (loggedInUserDocID, profileID, isFollowingProfile) =>
  firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocID)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileID)
        : FieldValue.arrayUnion(profileID)
    });

// update followers array of user who has been followed
// toggle following state based on isFollowingProfile param
export const updateFollowersArray = async (profileDocID, currentUserID, isFollowingProfile) =>
  firebase
    .firestore()
    .collection('users')
    .doc(profileDocID)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(currentUserID)
        : FieldValue.arrayUnion(currentUserID)
    });

// get username, photo data, and bool userLikedPhoto for each user currentUser follows
export const getPhotos = async (userID, following) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userID', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  // Easiest way to do a map inside an await?
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userID)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userID);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
};

export const getUserPhotosByUsername = async (username) => {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userID', '==', user.userID)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
};

export const isUserFollowingProfile = async (loggedInUserUsername, profileUserID) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserID)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return response.userID;
};

// Update the following and followers array of loggedInUser and other user, respectively
export const toggleFollow = async (
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) => {
  // activeUser's firebase doc, profileUser's ID
  await updateFollowingArray(activeUserDocId, profileUserId, isFollowingProfile);
  // profileUser's firebase doc, activeUser's ID
  await updateFollowersArray(profileDocId, followingUserId, isFollowingProfile);
};
