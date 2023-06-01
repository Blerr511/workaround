import React, { useEffect } from 'react';

export const HelloWorld = () => {
  useEffect(() => {
    console.log('Hello from shared ui library');
  }, []);

  return (
    <div style={{ backgroundColor: 'cyan' }}>
      Hello World From Component Library
    </div>
  );
};
