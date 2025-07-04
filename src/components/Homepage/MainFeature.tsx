// src/components/Homepage/MainFeature.tsx
'use client';

import React from 'react';
import styles from './MainFeature.module.css';
import Image from 'next/image';

const MainFeature = () => {
  const updates = [
    { time: '18h ago', text: 'Hamas mourns 3 fighters killed by Israel' },
    { time: '18h ago', text: 'GHF has ‘nothing to do with alleviating starvation in Gaza’' },
    { time: '18h ago', text: 'Palestinian Mujahideen Movement condemns Israeli strike on Gaza City school' },
    { time: '19h ago', text: 'Let UN distribute Gaza aid: UNRWA' },
    { time: '19h ago', text: 'Turkiye condemns West Bank annexation calls by Israeli politicians' },
    { time: '19h ago', text: 'Photos: Palestinians mourn loved ones killed in Israeli attacks' }
  ];

  return (
    <div className={styles.mainFeatureWrapper}>
      <div className={styles.imageContainer}>
        <Image
          src="/Assets/main.png"
          alt="Main News"
          width={700}
          height={400}
          className={styles.mainImage}
        />
        <div className={styles.underline}></div>
      </div>

      <h2 className={styles.title}>
        ‘Horrific scenes’ in Gaza as Israel <br />
        kills dozens of aid seekers
      </h2>

      <h4 className={styles.liveLabel}>🔴 LIVE UPDATES</h4>

      <ul className={styles.updateList}>
        {updates.map((item, index) => (
          <li key={index} className={styles.updateItem}>
            <span className={styles.dot}>🟠</span>
            <span className={styles.time}>{item.time}</span>
            <span className={styles.text}>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainFeature;
