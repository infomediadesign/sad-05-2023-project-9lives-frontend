

import React from 'react';

const Hearts = ({ lives }) => {
  const heartIcons = Array.from({ length: 9 }, (_, index) => (
    <span key={index} className={`heart ${index >= lives ? 'empty' : ''}`}>
      &hearts;
    </span>
  ));

  return (
    <div className="hearts-container">
      {heartIcons.map((heart, index) => (
        <React.Fragment key={index}>
          {heart}
          {' '}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Hearts;
