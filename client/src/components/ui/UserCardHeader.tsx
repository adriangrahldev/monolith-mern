import React from 'react';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserCardHeader = () => {
  return (
    <header className="bg-gray-100 p-1 rounded-lg shadow-md flex items-center w-60">
      <div className="flex items-center">
        <div className="p-2 rounded-full bg-black text-white">
          <FontAwesomeIcon icon={faUserCircle} size="xl" />
        </div>
        <div className="ml-4">
          <h2 className="text-sm font-semibold">Adrian Grahl Maciel</h2>
          <p className="text-xs text-gray-600">admin@adriangrahl.dev</p>
        </div>
      </div>
    </header>
  );
};

export default UserCardHeader;
