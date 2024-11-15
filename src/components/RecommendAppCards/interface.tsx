import { MouseEventHandler } from "react";

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
  }[];
  category: { attributes: { label: string } };
  id: { attributes: { "im:id": string } };
  detail: { averageUserRatingForCurrentVersion: number };
};
export interface RecommendAppCardProps {
  data: DataType;
  keyword?: string;
  keywordPaths?: string[];
  idx?: number;
  onClick?: MouseEventHandler;
}

export interface KeywordProps {
  keywords: string[];
  text: string;
}

export interface RecommendAppCardsProps {
  data: DataType[];
}
