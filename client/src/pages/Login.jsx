import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [formData, setFormData] = useState({
    emailAddress: '',
    password: ''
  });
  const { emailAddress, password } = formData;

  // Error handling
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setFormData({
        emailAddress: '',
        password: ''
      });
      setError(error.message);
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
    document.title = 'Login - SocialMediaApp';
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

          <form onSubmit={handleLogin} method="POST">
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
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full mb-4 bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">Test Account</p>
          <p className="text-sm">Email: dali@google.com</p>
          <p className="text-sm">Password: test123</p>
        </div>
      </div>
    </div>
  );
}
