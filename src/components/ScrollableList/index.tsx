import { Empty, Skeleton } from "antd";
import React from "react";

import useThrottle from "@/hook/useThrottle";

function ScrollableList({
  height = "100%",
  data,
  component: Component,
  getList,
  children,
  loading,
  bias = 2000,
}: {
  children?: React.ReactNode;
  height?: string;
  data: any[];
  component: ({ data }: { data: any }) => React.ReactNode;
  getList: () => void;
  loading: boolean;
  bias?: number;
}) {
  const ref = React.useRef(null);
  const callback = useThrottle(getList, 2000);

  React.useEffect(() => {
    if (!ref.current) return;
    const scroll = (ele: Event): void => {
      const target = ele.target as HTMLElement;
      const diff = target.scrollHeight - target.scrollTop - target.clientHeight;
      if (diff < bias) callback();
    };
    const dom = ref.current as HTMLElement;
    dom.addEventListener("scroll", scroll);
    return () => dom.removeEventListener("scroll", scroll);
  }, [ref, getList]);

  if (!data.length) return <Empty />;
  return (
    <div
      ref={ref}
      id="scrollable-list"
      className="overflow-y-scroll"
      style={{ height }}
    >
      {children}
      <Component data={data} />
      <div className="text-center m-8">
        {loading ? <Skeleton avatar paragraph={{ rows: 4 }} /> : null}
      </div>
    </div>
  );
}
export default ScrollableList;
