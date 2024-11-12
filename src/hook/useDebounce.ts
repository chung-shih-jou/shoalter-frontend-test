function useDebounce(callback: Function, delay: number) {
  let timer = null as any;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, delay || 1000);
  };
}
export default useDebounce;
