import { Space, Typography } from "antd";
import { get } from "lodash";
import Image from "next/image";
import { RecommendAppCardProps, RecommendAppCardsProps } from "./interface";

export function RecommendAppCard({ data }: RecommendAppCardProps) {
  const imgSrc = get(data, "im:image[0].label", "");
  const imgAlt = get(data, "im:name.label", "");
  const imgSize = get(data, "im:image[0].attributes", {
    height: undefined,
  });
  const title = get(data, "title.label", "");
  const category = get(data, "category.attributes.label", "");
  return (
    <Space align="center" wrap direction="vertical">
      <Image
        className="rounded-lg"
        src={imgSrc}
        alt={imgAlt}
        height={imgSize.height}
        width={imgSize.height}
        loading="lazy"
        sizes="(min-width: 808px) 50vw, 100vw"
      />
      <Typography.Title level={5} className="line-clamp-2 h-12">
        {title}
      </Typography.Title>
      <Typography.Text>{category}</Typography.Text>
    </Space>
  );
}
function RecommendAppCards({ data }: RecommendAppCardsProps) {
  return (
    <Space>
      {data.map((item) => (
        <RecommendAppCard key={item.title.label} data={item} />
      ))}
    </Space>
  );
}
export default RecommendAppCards;
