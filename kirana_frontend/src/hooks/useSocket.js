import { useState, useEffect } from 'react';
import socket from '../api/socket';

export const useSocket = (event, callback) => {
  useEffect(() => {
    socket.on(event, callback);
    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);
  
  return socket;
};
