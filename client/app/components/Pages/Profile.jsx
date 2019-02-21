import React from 'react';
import { Link } from 'react-router-dom';

const Main = ({ match }) => (
  <div>
    <h1>
      <Link to="/">{match.params.userName}</Link>
    </h1>
  </div>
);

export default Main;
