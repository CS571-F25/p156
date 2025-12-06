import React from 'react';
import { useState, useEffect } from 'react';

function useUserState(key, defaultValue) {
    const [value, setValue] = useState(() => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value]);
  
    return [value, setValue];
  }
  
export default useUserState;
