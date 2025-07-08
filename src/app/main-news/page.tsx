// src/app/main-news/page.tsx
import React from 'react';
import MainNewsPosts from '@/components/Homepage/MainNews/MainNewsPosts';

export default function MainNewsPage() {
  return (
    <main>
      <h1 style={{ color: '#900f0f', margin: '20px' }}>Main News</h1>
      <MainNewsPosts />
    </main>
  );
}
