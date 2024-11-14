"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { get, map } from "lodash";
import { Col, Divider, Row, Space, Typography } from "antd";
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
import { SearchPaths } from "@/config/home";

function Main() {
  const { list: apps, error: appError } = useAppSelector((state) => state.app);
  const { list: recommends, error: recommendError } = useAppSelector(
    (state) => state.recommend
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [keyword, setKeyowrd] = useState<string>("");

  const [height, setHeight] = useState<number>(0);
  const [searchIds, setSearchIds] = useState<DataType[]>([]);
  const recommendAppsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { open: initLoading, withLoading } = useLoading();

  const size = 10;

  const onSearch = async (v: any) => {
    const searchText = v.toLowerCase();
    if (!v) {
      setSearchIds([]);
      setKeyowrd("");
      return;
    }
    const results = apps.filter((app) => {
      return SearchPaths.find((path) =>
        get(app, path).toLowerCase().includes(searchText)
      );
    });

    await getAppList(results, { page: 0 });
    setSearchIds(map(results, "id"));
    setKeyowrd(searchText);
  };

  const data = useMemo(() => {
    if (searchIds.length)
      return apps.filter((app = { id: -1 }) => searchIds.includes(app.id));
    else return apps;
  }, [apps, searchIds]);

  const getAppList = async (_apps = data, options = { page }) => {
    const _page = options.page;
    const noDetailApps = _apps
      .slice(_page * size, (_page + 1) * size)
      .filter(({ detail }) => !detail);
    const appIds = map(noDetailApps, "id");
    if (!appIds.length) {
      if (data.length > _page * size) setPage(_page + 1);
      return;
    }
    setLoading(true);
    const res = await dispatch(App.getDetailByIds(appIds));
    if (!res.error) setPage(_page + 1);
    setLoading(false);
  };

  const init = async () => {
    const [appResp] = await Promise.all([
      dispatch(App.getList({ size: 100 })),
      dispatch(Recommend.getList()),
    ]);

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
    if (recommendAppsRef.current && !initLoading)
      setHeight(recommendAppsRef.current.clientHeight);
  }, [recommendAppsRef.current?.clientHeight]);

  console.log("appError", appError, "recommendError", recommendError);
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
          onChange={onSearch}
          onSearch={onSearch}
          fixed={{ top: 0 }}
        />
        <Typography.Title level={4}>推薦</Typography.Title>

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
      </Space>
      <Divider />
      <Typography.Title level={4}>排行榜前100</Typography.Title>

      <ScrollableList
        data={data.slice(0, page * size)}
        height={`calc(100vh - ${height + 48}px - 2rem)`}
        getList={() => getAppList(data)}
        bias={2000}
        component={({ data }: { data: DataType[] }) => (
          <Row>
            {data.map((data, idx: number) => (
              <Col
                id={"app-col-" + idx}
                key={"app-" + idx}
                lg={8}
                md={12}
                xs={24}
                sm={24}
              >
                <Row align={"middle"}>
                  <Divider className="app-divider" />
                  <Col md={0} xs={2} sm={1}>
                    <Typography.Text type="secondary">
                      <span className="text-xl">{idx + 1}</span>
                    </Typography.Text>
                  </Col>
                  <Col md={24} xs={22} sm={23}>
                    <AppCard
                      data={data}
                      idx={idx}
                      keywordPaths={SearchPaths}
                      keyword={keyword}
                    />
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        )}
        loading={loading}
      />
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
