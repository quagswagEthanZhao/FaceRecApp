import React from 'react';
import './Rank.css';

const Rank = () => {
  return (
    <div>
      <div className="white f3">
        <p className="rank">The Current Rank is displayed in this area</p>
      </div>
      <div className="white f3">
        <p className="ranknum">{'#1'}</p>
      </div>
    </div>
  );
};

export default Rank;
