import React from 'react';
import Logo from './Logo.png';
import Tilt from 'react-tilt';

const Navigation = ({ userStatusChange, isSignedIn }) => {
  return (
    <nav
      style={{
        margin: '5px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Tilt
        className="Tilt"
        options={{ max: 25 }}
        style={{ height: 50, width: 50 }}
      >
        <div className="Tilt-inner">
          {' '}
          <img src={Logo} alt="Logo" />{' '}
        </div>
      </Tilt>
      {isSignedIn ? (
        <p
          style={{
            fontSize: '18px',
            cursor: 'pointer',
            marginTop: '10px',
            textDecoration: 'underline',
          }}
          onClick={() => userStatusChange('signin')}
        >
          Sign out
        </p>
      ) : (
        <p></p>
      )}
    </nav>
  );
};

export default Navigation;
