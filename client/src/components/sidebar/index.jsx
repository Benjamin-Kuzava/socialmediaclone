import useUser from '../../hooks/use-user';
import Suggestions from './Suggestions';
import User from './User';

export default function Sidebar() {
  const {
    user: { fullName, username, userID }
  } = useUser();

  console.log(fullName, username, userID);

  return (
    <div className="p-4">
      <User />
      <Suggestions />
    </div>
  );
}
