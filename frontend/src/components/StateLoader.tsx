import React from 'react';
import logo from '../assets/logo.png'

interface LoaderProps {
  isLoading: boolean;
}

export const StateLoader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 text-2xl font-bold">
          <img src={logo} className='scale-150' alt="" />
        </div>
      </div>
    </div>
  );
};