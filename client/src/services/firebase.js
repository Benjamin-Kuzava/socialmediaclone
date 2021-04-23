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
