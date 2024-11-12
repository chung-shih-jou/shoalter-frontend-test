import { get } from "lodash";
import Loading from "@/components/Loading";
import { useState } from "react";

import Context from "./Context";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [loadingState, setLoadingState] = useState({});

  const getIsLoading = (state = {}) => {
    return Boolean(Object.values(state).find((val) => val));
  };

  const withLoading = async (fn: Function, key = "") => {
    handleOpen(key);
    const resp = await fn;
    handleClose(key);
    return resp;
  };

  const handleOpen = (key = "") => {
    const state = { ...loadingState, [key]: true };
    setLoadingState(state);
    setOpen(getIsLoading(state));
  };

  const handleClose = (key = "") => {
    const state = { ...loadingState, [key]: false };
    setLoadingState(state);
    setOpen(getIsLoading(state));
  };

  const handleToggle = (key = "") => {
    const state = { ...loadingState, [key]: !get(loadingState, key) };
    setLoadingState(state);
    setOpen(getIsLoading(state));
  };

  const props = {
    open: handleOpen,
    close: handleClose,
    toggle: handleToggle,
    withLoading,
    isOpen: open,
  };

  return (
    <Context.Provider value={{ ...props }}>
      {children}
      <Loading loading={open} />
    </Context.Provider>
  );
};

export default Provider;
