import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

// set activeUser in state
const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserObjById = async () => {
      // destructure resp from user array
      const [currentUser] = await getUserByUserId(user.uid);
      setActiveUser(currentUser);
    };
    if (user?.uid) {
      getUserObjById();
    }
  }, [user]);
  return { user: activeUser };
};

export default useUser;
