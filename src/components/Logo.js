import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      width='150px'
      height="60px"
      // src="/static/logo.svg"
      src="/static/logo-aidpi.png"
      {...props}
    />
  );
};

export default Logo;
