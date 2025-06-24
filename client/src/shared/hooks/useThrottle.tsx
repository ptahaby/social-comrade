import { useState, useRef, useEffect } from 'react';

const useThrottle = <T,>(value: T, interval = 500) => {
  const [throttleValue, setThrottleValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    console.log(
      Date.now(),
      lastExecuted.current + interval,
      Date.now() >= lastExecuted.current + interval,
    );
    if (Date.now() >= lastExecuted.current + interval) {
      setThrottleValue(value);
      lastExecuted.current = Date.now();
    } else {
      const timeId = setTimeout(() => {
        lastExecuted.current = Date.now();
        console.log('!!!!');
        setThrottleValue(value);
      }, interval);

      return () => {
        clearInterval(timeId);
      };
    }
  }, [value, interval]);

  return throttleValue;
};
``;
export default useThrottle;
