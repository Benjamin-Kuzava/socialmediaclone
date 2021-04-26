import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userID = '' }
  } = useContext(UserContext);

  useEffect(() => {
    const fetchTimelinePhotos = async () => {
      const [{ following }] = await getUserByUserId(userID);
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userID, following);
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    };
    if (userID) {
      fetchTimelinePhotos();
    }
  }, [userID]);

  return { photos };
};

export default usePhotos;
