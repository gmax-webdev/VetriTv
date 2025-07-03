'use client';

import styles from './LiveUpdates.module.css';

export default function LiveUpdates() {
  const updates = [
    { time: '16h ago', text: "Israeli minister calls for seizing ‘historic opportunity’ to annex West Bank" },
    { time: '17h ago', text: "Photos: Israel bombs Shujayea neighbourhood in eastern Gaza City" },
    { time: '17h ago', text: "Death toll in Gaza rises by 43" },
    { time: '17h ago', text: "Israeli demolitions in West Bank will make 400 families homeless" },
  ];

  return (
    <section className={styles.liveUpdates}>
      <h3>🔴 LIVE UPDATES</h3>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>
            <span>{update.time}:</span> {update.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
