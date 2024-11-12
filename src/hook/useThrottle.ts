import { useRef } from "react";

function useThrottle(callback: Function, delay: number) {
  const lastRun = useRef(Date.now());
  return async (...args: any) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(args); // Execute the callback
      lastRun.current = Date.now(); // Update last execution time
    }
  };
}
export default useThrottle;
