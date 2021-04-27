import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

// higher order component to handle redirects for loggedInUsers
export default function IsUserLoggedIn({ user, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }

        if (user) {
          return <Redirect to={{ pathname: loggedInPath, state: { from: location } }} />;
        }
      }}
    />
  );
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  loggedInPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
};
