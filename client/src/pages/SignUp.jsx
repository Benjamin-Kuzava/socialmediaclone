import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    emailAddress: '',
    password: ''
  });
  const { username, fullName, emailAddress, password } = formData;

  // Error handling
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '' || fullName === '' || username === '';

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Check if username is in database, return array
    // Consider changing helper function to output boolean result
    const usernameExists = await doesUsernameExist(username);
    // if output array does not have a length, username is valid
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // Authentication
        // After user is created with auth, update user's profile with displayName
        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // Firebase user collection (create a document)
        await firebase.firestore().collection('users').add({
          userID: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreate: Date.now()
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFormData({
          username: '',
          fullName: '',
          emailAddress: '',
          password: ''
        });
        setError(error.message);
      }
    }
    if (usernameExists.length) {
      setFormData((prevState) => ({
        ...prevState,
        username: ''
      }));
      setError('That username is already taken, please try another.');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    document.title = 'Sign Up - SocialMediaApp';
  });

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpeg" alt="Iphone with app displayed." />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              type="text"
              aria-label="Enter your username"
              placeholder="User Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <input
              type="text"
              aria-label="Enter your full name"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              name="fullName"
              value={fullName}
              onChange={handleChange}
            />
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              name="emailAddress"
              value={emailAddress}
              onChange={handleChange}
            />
            <input
              type="password"
              aria-label="Enter your password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
              ${isInvalid && 'opacity-50'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Already have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
