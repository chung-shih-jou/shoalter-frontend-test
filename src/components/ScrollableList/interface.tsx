enum LinkTypes {
  HTML = "text/html",
  IMG = "image/jpeg",
}
export type DataType = {
  "im:name": { label: "string" };
  "im:image": {
    label: "string";
    attributes: { height: number | `${number}` };
  }[];
  title: { label: string };
  link: {
    attributes: {
      title: string;
      href: string;
      type: LinkTypes;
      "im:assetType": string;
    };
  };
  category: { attributes: { label: string } };
};

export interface ScrollableListProps {
  data: DataType[];
}
