import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

export default function Header({ photosCount, profile, followerCount, setFollowerCount }) {
  const {
    docId: profileDocId,
    userID: profileUserId,
    fullName,
    following = [],
    username: profileUsername
  } = profile;
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = profileUsername && user.username !== profileUsername;

  useEffect(() => {
    const isCurrentUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      // turn isFollowing value into boolean
      setIsFollowingProfile(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      isCurrentUserFollowingProfile();
    }
  }, [profileUserId, user]);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((prev) => !prev);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userID);
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {profileUsername ? (
          <img
            className="rounded-full h-40 w-40 flex"
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${profileUsername} avatar`}
          />
        ) : (
          <Skeleton count={1} width="10rem" height="10rem" circle="true" />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          {!profileUsername ? (
            <Skeleton count={1} height={24} width={677} />
          ) : (
            <p className="text-2xl mr-4">{profileUsername}</p>
          )}
          {activeBtnFollow && (
            <button
              type="button"
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              onClick={handleToggleFollow}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile && isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {!fullName ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {` `}
                {photosCount === 1 ? 'photo' : 'photos'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length}</span>
                {` `}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} width={677} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userID: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array
  }).isRequired
};
