import React from 'react';

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f6f8fa',
      }}
    >
      <h1
        style={{
          fontSize: '144px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: '24px',
          color: '#666',
          marginBottom: '20px',
        }}
      >
        This page could not be found.
      </p>
      <a
        href="/"
        style={{
          fontSize: '18px',
          color: '#337ab7',
          textDecoration: 'none',
        }}
      >
        Return to homepage
      </a>
    </div>
  );
};

export default NotFoundPage;