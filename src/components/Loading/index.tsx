import { Spin } from "antd";

interface LoadingProps {
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
}
function Loading({ loading = true, ...props }: LoadingProps) {
  return (
    <div
      className={
        "absolute top-0 left-0 w-full h-full text-center  p-8 " +
        (loading ? "" : "hidden")
      }
      style={{ background: "rgba(0,0,0,0.2)" }}
      {...props}
    >
      <Spin />
    </div>
  );
}
export default Loading;
