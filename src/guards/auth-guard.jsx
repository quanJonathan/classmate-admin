import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthContext } from '../contexts/auth-context';

export const AuthGuard = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Only do authentication check on component mount.
    // This flow allows you to manually redirect the user after sign-out,
    // otherwise, this will be triggered and will automatically redirect to the sign-in page.
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting');
      navigate.navigate({
        pathname: '/auth/login',
        state: { continueUrl: location.pathname !== '/' ? location.pathname : undefined },
      });
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, navigate, location.pathname]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur,
  // and that tells us that the user is authenticated / authorized.
  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
