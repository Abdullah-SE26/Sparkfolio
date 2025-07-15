import React from 'react';

const Ping = () => {
  return (
    <div className="relative ">
      <span className="absolute right-3 -top-4 flex h-3 w-3 ">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-600 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-600"></span>
      </span>
    </div>
  );
};

export default Ping;
