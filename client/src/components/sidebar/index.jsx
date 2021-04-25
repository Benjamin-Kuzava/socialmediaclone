import useUser from '../../hooks/use-user';
import Suggestions from './Suggestions';
import User from './User';

export default function Sidebar() {
  const {
    user: { docId, fullName, username, userID, following }
  } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userID={userID} following={following} loggedInUserDocID={docId} />
      {/* need userID to make sure that follows array of a suggestion doesn't include current user */}
    </div>
  );
}
