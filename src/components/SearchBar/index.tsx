import { Input } from "antd";

const { Search } = Input;
interface SearchBarProps {
  onSearch: (v: any) => void;
  onChange?: (v: any) => void;
  fixed?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  placeholder?: string;
}

function SearchBar({
  placeholder,
  onSearch,
  fixed,
  onChange = () => {},
}: SearchBarProps) {
  const fixedCls = Object.entries(fixed || {}).reduce(
    (s, [key, value]) => s + `${key}-${value}`,
    ""
  );
  return (
    <div className={"w-full" + (fixed ? ` sticky ${fixedCls}` : "")}>
      <Search
        placeholder={placeholder || ""}
        onSearch={onSearch}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
export default SearchBar;
