import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../components/Header';
import UserProfile from '../components/profile';
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from '../services/firebase';

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const checkUserExists = async () => {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };
    checkUserExists();
  }, [history, username]);

  useEffect(() => {
    if (user) {
      document.title = `${user.fullName} - SocialMediaApp`;
    }
  }, [user]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
