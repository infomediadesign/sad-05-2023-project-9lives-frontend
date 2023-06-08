import React, { useEffect } from 'react';

const Notification = ({ showNotification, setShowNotification }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showNotification, setShowNotification]);

  return (
    <div className={`notification-container ${showNotification ? 'show' : ''}`}>
      <p>You have already entered this letter</p>
    </div>
  );
};

export default Notification;
