"use client";

import { useEffect, useRef, useState } from "react";
import { get, map } from "lodash";
import { Alert, Col, Divider, Row, Space, Spin, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Provider } from "react-redux";

import AppCard from "@/components/AppCards";
import SearchBar from "@/components/SearchBar";
import { RecommendAppCard } from "@/components/RecommendAppCards";
import ScrollableList from "@/components/ScrollableList";

import LoadingProvider, { useLoading } from "@/providers/Loading";
import store from "@/store";
import * as App from "@/store/api/app";
import * as Recommend from "@/store/api/recommend";

import { DataType } from "@/components/RecommendAppCards/interface";

function Main() {
  const apps = useAppSelector((state) => state.app.list);
  const recommends = useAppSelector((state) => state.recommend.list);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [error, setError] = useState<{ app: boolean; recommend: boolean }>({
    app: false,
    recommend: false,
  });
  const [height, setHeight] = useState<number>(0);
  const recommendAppsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { withLoading } = useLoading();

  const onSearch = (v: any) => {
    console.log(v);
  };

  const getAppList = async (_apps = apps) => {
    setLoading(true);
    const appIds = map(_apps.slice(page * size, (page + 1) * size), "id");
    if (!appIds.length) return setLoading(false);
    const res = await dispatch(App.getDetailByIds(appIds));
    if (!res.error) setPage(page + 1);
    setLoading(false);
  };

  const init = async () => {
    const [appResp, recommendResp] = await Promise.all([
      dispatch(App.getList()),
      dispatch(Recommend.getList()),
    ]);
    setError({ app: !!appResp.error, recommend: !!recommendResp.error });
    const data = map(get(appResp, "payload", []), (v) => ({
      ...v,
      id: get(v, "id.attributes.im:id", ""),
    }));
    getAppList(data);
  };

  useEffect(() => {
    withLoading(init());
  }, []);

  useEffect(() => {
    if (recommendAppsRef.current)
      setHeight(recommendAppsRef.current.clientHeight);
  }, [recommendAppsRef.current?.clientHeight]);

  return (
    <div className="p-4 relative overflow-scroll">
      <Space
        ref={recommendAppsRef}
        id="recommend-apps"
        size={"large"}
        direction="vertical"
      >
        <SearchBar
          placeholder="search app"
          onSearch={onSearch}
          fixed={{ top: 0 }}
        />
        <Typography.Title level={4}>推薦</Typography.Title>
        {error.recommend ? (
          <Alert
            message="404"
            description="Something went wrong, please try again later."
            type="error"
            showIcon
          />
        ) : (
          <Row
            className="flex overflow-x-scroll"
            style={{ scrollbarWidth: "none", flexFlow: "nowrap" }}
          >
            {recommends.map((item) => (
              <Col key={item.title.label} lg={4} md={4} sm={8} xs={8}>
                <RecommendAppCard data={item} />
              </Col>
            ))}
          </Row>
        )}
      </Space>
      <Divider />
      {error.app ? (
        <Alert
          message="404"
          description="Something went wrong, please try again later."
          type="error"
          showIcon
        />
      ) : (
        <ScrollableList
          data={apps.slice(0, page * size)}
          height={`calc(100vh - ${height + 48}px - 2rem)`}
          getList={() => getAppList(apps)}
          component={(app: DataType, idx: number) => (
            <Row id={"app-" + idx} key={"app-" + idx} align={"middle"}>
              {idx ? <Divider /> : null}
              <Col span={4}>
                <Typography.Text type="secondary" className="text-lg">
                  {idx + 1}
                </Typography.Text>
              </Col>
              <Col span={20}>
                <AppCard data={app} />
              </Col>
            </Row>
          )}
        >
          <div className="text-center m-8">{loading ? <Spin /> : null}</div>
        </ScrollableList>
      )}
    </div>
  );
}
export default function HomePage() {
  return (
    <Provider store={store}>
      <LoadingProvider>
        <Main />
      </LoadingProvider>
    </Provider>
  );
}
