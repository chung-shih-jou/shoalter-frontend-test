import { get } from "lodash";
import { RecommendAppCardProps } from "../RecommendAppCards/interface";
import Image from "next/image";
import { Col, Rate, Row, Space, Typography } from "antd";

function AppCard({ data }: RecommendAppCardProps) {
  const imgSrc = get(data, "im:image[0].label", "");
  const imgAlt = get(data, "im:name.label", "");
  const imgSize = get(data, "im:image[0].attributes", {
    height: undefined,
  });
  const title = get(data, "title.label", "");
  const category = get(data, "category.attributes.label", "");
  const rate = get(data, "detail.averageUserRatingForCurrentVersion", 0);
  const userRatingCount = get(data, "detail.userRatingCount", 0);

  return (
    <Row align={"middle"}>
      <Col span={8}>
        <Image
          className="rounded-full"
          src={imgSrc}
          alt={imgAlt}
          height={imgSize.height}
          width={imgSize.height}
          loading="lazy"
          sizes="(min-width: 808px) 50vw, 100vw"
        />
      </Col>
      <Col span={16}>
        <Space size={2} direction="vertical">
          <Typography.Title level={5}>{title}</Typography.Title>
          <div />
          <Typography.Text>{category}</Typography.Text>
          <div>
            <Rate disabled allowHalf value={rate} />
            <Typography.Text className="ml-2 mb-2" type="secondary">
              ({userRatingCount})
            </Typography.Text>
          </div>
        </Space>
      </Col>
    </Row>
  );
}
export default AppCard;
