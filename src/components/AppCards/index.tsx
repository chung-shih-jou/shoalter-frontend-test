import { get } from "lodash";
import {
  KeywordProps,
  RecommendAppCardProps,
} from "../RecommendAppCards/interface";
import Image from "next/image";
import { Col, Rate, Row, Space, Typography } from "antd";

function Keywords({ keywords, text }: KeywordProps) {
  const highlightedText = [] as React.ReactNode[][];
  if (!keywords.length || !text) return text;
  keywords.forEach((keyword) => {
    let textLen = 0;
    const highlightedTexts = text
      .toLowerCase()
      .split(keyword.toLowerCase())
      .slice(0, -1)
      .map((substring) => {
        const prefix = text.slice(
          textLen + substring.length - 5,
          textLen + substring.length
        );
        const suffix = text.slice(
          textLen + substring.length + 1 + keyword.length,
          textLen + substring.length + 1 + keyword.length + 5
        );
        const result = text.slice(
          textLen + substring.length,
          textLen + substring.length + 1 + keyword.length
        );
        textLen += substring.length + keyword.length;
        return (
          <>
            {prefix ? `...${prefix}` : ""}
            <b>{result}</b>
            {suffix ? `${suffix}...` : ""}
          </>
        );
      });
    if (highlightedTexts.length) highlightedText.push(highlightedTexts); // highlight keyword
  });
  return (
    <>
      {highlightedText.length
        ? highlightedText.map((texts) => {
            return <span key={text}>{texts}</span>;
          })
        : text}
    </>
  );
}
function AppCard({
  data,
  keyword = "",
  keywordPaths,
  idx = 0,
}: RecommendAppCardProps) {
  const imgSrc = get(data, "im:image[0].label", "");
  const imgAlt = get(data, "im:name.label", "");
  const imgSize = get(data, "im:image[0].attributes", {
    height: 75,
  });
  const title = get(data, "title.label", "");
  const summary = get(data, "summary.label", "");
  const category = get(data, "category.attributes.label", "");
  const rate = get(data, "detail.averageUserRatingForCurrentVersion", 0);
  const userRatingCount = get(data, "detail.userRatingCount", 0);

  const keywords = keyword ? [keyword] : [];
  const imgHeight = Number(imgSize.height);
  return (
    <Row align={"middle"} gutter={[0, 24]}>
      <Col md={8} xs={8} sm={8} className="text-center">
        <Image
          className="rounded-full m-auto"
          src={imgSrc}
          alt={imgAlt}
          height={imgHeight}
          width={imgHeight}
          loading="lazy"
          sizes="(min-width: 808px) 50vw, 100vw"
        />
      </Col>
      <Col md={16} xs={0} sm={0}>
        <Typography.Title level={4} className="line-clamp-2">
          {keywordPaths?.includes("title.label") ? (
            <Keywords keywords={keywords} text={title} />
          ) : (
            title
          )}
        </Typography.Title>
        <div />
      </Col>
      <Col md={24} xs={16} sm={16}>
        <Row>
          <Col md={8} xs={0} sm={0} className="text-center">
            <span className="text-lg">{idx + 1}</span>
          </Col>
          <Col md={16} xs={24} sm={24}>
            <Row>
              <Space size={2} direction="vertical">
                <Col md={0} xs={24} sm={24}>
                  <Typography.Title level={4} className="line-clamp-2">
                    {keywordPaths?.includes("title.label") ? (
                      <Keywords keywords={keywords} text={title} />
                    ) : (
                      title
                    )}
                  </Typography.Title>
                  <div />
                </Col>
                <Typography.Text className="line-clamp-2">
                  {keywordPaths?.includes("summary.label") ? (
                    <Keywords keywords={keywords} text={summary} />
                  ) : (
                    summary
                  )}
                </Typography.Text>
                <div />
                <Typography.Text type="secondary">{category}</Typography.Text>
                <div>
                  <Rate disabled allowHalf value={rate} />
                  <Typography.Text className="ml-2 mb-2" type="secondary">
                    ({userRatingCount})
                  </Typography.Text>
                </div>
              </Space>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
export default AppCard;
