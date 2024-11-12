import React from "react";

import useThrottle from "@/hook/useThrottle";

function ScrollableList({
  height = "100%",
  data,
  component,
  getList,
  children,
}) {
  const ref = React.useRef();
  const callback = useThrottle(getList, 2000);

  const bias = 2000;

  React.useEffect(() => {
    if (!ref.current) return;
    const scroll = (ele) => {
      const diff =
        ele.target.scrollHeight -
        ele.target.scrollTop -
        ele.target.clientHeight;

      if (diff < bias) callback();
    };
    ref.current.addEventListener("scroll", scroll);
    return () => ref.current.removeEventListener("scroll", scroll);
  }, [ref, getList]);
  return (
    <div
      ref={ref}
      id="scrollable-list"
      className="overflow-y-scroll"
      style={{ height }}
    >
      {data.map(component)}
      {children}
    </div>
  );
}
export default ScrollableList;
