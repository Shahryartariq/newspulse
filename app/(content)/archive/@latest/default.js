import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";
import React from "react";

const LatestPage = async () => {
  const latestNews = await getLatestNews();
  return <>
    <h2>Latest News</h2>
    <NewsList news={latestNews} />
  </>;
};

export default LatestPage;
