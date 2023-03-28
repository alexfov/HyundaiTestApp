import { useCallback, useEffect, useRef, useState } from 'react';

const useInterval = (callback: Function, delay?: number | null) => {
  const savedCallback = useRef<Function>(() => {});
  const intervalId = useRef<ReturnType<typeof setInterval> | undefined>();
  const [resetKey, setResetKey] = useState<number>(0);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      intervalId.current = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(intervalId.current);
    }

    return undefined;
  }, [delay, resetKey]);

  const resetInterval = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      setResetKey((prevResetKey) => prevResetKey + 1);
    }
  }, []);

  return { resetInterval };
};

export default useInterval;
