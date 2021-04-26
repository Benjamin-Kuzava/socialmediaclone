import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './SuggestedProfile';

const Suggestions = ({ userID, following, loggedInUserDocID }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const fetchSuggestedProfiles = async () => {
      // console.log('useeffect');
      const resp = await getSuggestedProfiles(userID, following);
      setProfiles(resp);
    };
    if (userID) {
      fetchSuggestedProfiles();
    }
  }, [userID, following]);

  // eslint-disable-next-line no-nested-ternary
  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions For You</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            suggestedProfileDocID={profile.docId}
            username={profile.username}
            profileID={profile.userID}
            userID={userID}
            loggedInUserDocID={loggedInUserDocID}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;

Suggestions.propTypes = {
  userID: PropTypes.string,
  loggedInUserDocID: PropTypes.string,
  following: PropTypes.array
};
