import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Text} from 'react-native';
import {FontFamily} from '@constants/font-family';

const CountdownTimer = ({expiresAt}) => {
  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const expiryDate = new Date(expiresAt).getTime();
    return Math.max(Math.floor((expiryDate - now) / 1000), 0);
  }, [expiresAt]);

  const [remainingTime, setRemainingTime] = useState(calculateTimeLeft);
  const intervalRef = useRef(null);

  const formatTime = useCallback(seconds => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${secs}s`;
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) return;

    intervalRef.current = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [remainingTime]);

  return (
    <Text
      style={{
        color: '#000',
        fontSize: 9,
        fontFamily: FontFamily.light,
        textTransform: 'capitalize',
      }}>
      {remainingTime > 0
        ? `Expires in ${formatTime(remainingTime)}`
        : 'Expired'}
    </Text>
  );
};

export default CountdownTimer;
