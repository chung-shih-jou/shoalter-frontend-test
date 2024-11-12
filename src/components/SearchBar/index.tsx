import { Input } from "antd";

interface SearchBarProps {
  onSearch: (v: any) => void;
  fixed?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  placeholder?: string;
}

function SearchBar({ placeholder, onSearch, fixed }: SearchBarProps) {
  const fixedCls = Object.entries(fixed || {}).reduce(
    (s, [key, value]) => s + `${key}-${value}`,
    ""
  );
  return (
    <div className={"w-full" + (fixed ? ` sticky ${fixedCls}` : "")}>
      <Input.Search placeholder={placeholder || ""} onSearch={onSearch} />
    </div>
  );
}
export default SearchBar;
