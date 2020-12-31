import React from 'react';
import './Rank.css';

const Rank = ({ currentUser }) => {
  return (
    <div>
      <div className="white f3">
        <p className="rank">Well come back {currentUser.name}, Your rank is</p>
      </div>
      <div className="white f3">
        <p className="ranknum">#{currentUser.entries}</p>
      </div>
    </div>
  );
};

export default Rank;
