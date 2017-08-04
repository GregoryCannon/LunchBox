import React from 'react';
import { Link } from 'react-router-dom';

const Error = (props) => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Return Home</Link>
    </div>
  );
};

export default Error;
