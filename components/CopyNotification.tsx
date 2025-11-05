import React from 'react';

interface CopyNotificationProps {
  show: boolean;
}

const CopyNotification: React.FC<CopyNotificationProps> = ({ show }) => {
  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      Copied to clipboard!
    </div>
  );
};

export default CopyNotification;