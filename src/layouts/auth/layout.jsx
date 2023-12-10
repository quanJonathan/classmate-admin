import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { Logo } from 'src/components/logo';

// TODO: Change subtitle text

const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto'
        }}
      >
        <div
          style={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '100%'
          }}
        >
          <header
            style={{
              left: 0,
              padding: '16px',
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                height: '32px',
                width: '32px'
              }}
            >
              <Logo />
            </div>
          </header>
          {children}
        </div>
        <div
          style={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            },
            width: '100%'
          }}
        >
          <div
            style={{
              padding: '16px'
            }}
          >
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1
              }}
              variant="h1"
            >
              Welcome to{' '}
              <span
                style={{ color: '#15B79E' }}
              >
                Devias Kit
              </span>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="subtitle1"
            >
              A professional kit that comes with ready-to-use MUI components.
            </Typography>
            <img
              alt=""
              src="/assets/auth-illustration.svg"
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
