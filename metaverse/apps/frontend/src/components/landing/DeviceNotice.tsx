import React from 'react';

const DeviceNotice = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-purple-600 text-white z-[60] text-center py-2 px-4">
      <p className="font-inter text-sm">
        ⚡ This application is currently optimized for desktop and tablet devices only
      </p>
    </div>
  );
};

export default DeviceNotice; 