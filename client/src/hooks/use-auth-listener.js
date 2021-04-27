import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

// listen for authorized user and update localStorage accordingly
const useAuthListener = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      // we have a user -> store in local storage
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // we don't have an authUser -> clear localstorage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    // cleanup function
    return () => listener();
  }, [firebase]);

  return { user };
};

export default useAuthListener;
