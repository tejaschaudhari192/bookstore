import React from 'react';

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
}

const Error: React.FC<ErrorPageProps> = ({ statusCode = 500, message = "An unexpected error occurred." }) => {
  const statusText = statusCode === 404 ? "Page Not Found" : "Internal Server Error";

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-6xl font-bold text-red-500 mb-4">
          {statusCode}
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          {statusText}
        </h1>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        {statusCode === 404 && (
          <a href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Home
          </a>
        )}
        {statusCode !== 404 && (
          <button onClick={() => window.history.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;