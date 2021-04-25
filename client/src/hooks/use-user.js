import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    // get user data based on uid
    const getUserObjById = async () => {
      // destructure resp from user array
      const [resp] = await getUserByUserId(user.uid);
      setActiveUser(resp);
    };
    // only run if a user is logged in
    if (user?.uid) {
      getUserObjById();
    }
  }, [user]);
  return { user: activeUser };
};

export default useUser;
