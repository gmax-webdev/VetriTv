import React from 'react';
import AllLatestNews from '@/components/Homepage/LatestNews/AllLatestNews';

const LatestNewsPage = () => {
  return (
    <main className="latest-news-page">
      <h1 className="page-title">Latest News</h1>
      <AllLatestNews />
    </main>
  );
};

export default LatestNewsPage;
