import React from 'react';
import LocalNews from './LocalNews';
import PoliticalNews from './PoliticalNews';
import './LocalAndPoliticalNews.css';

const LocalAndPoliticalLayout = () => {
  return (
    <div className="local-political-container">
      <LocalNews />
      <PoliticalNews />
    </div>
  );
};

export default LocalAndPoliticalLayout;
