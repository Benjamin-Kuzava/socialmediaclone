import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error handling
  const [error, setError] = useState('');
  const isInvalid = password === '' || email === '';

  const handleLogin = () => {};

  useEffect(() => {
    document.title = 'Login - SocialMediaApp';
  });

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <p>I have no idea</p>
    </div>
  );
}