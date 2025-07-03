'use client';

import styles from './MainFeature.module.css';

export default function MainFeature() {
  return (
    <section className={styles.mainFeature}>
      <img src="https://via.placeholder.com/700x400" alt="Main story" />

      <div className={styles.textContent}>
        <span className={styles.highlight}></span>
        <h2>
          More than 40 Palestinians killed as Trump says Israel agrees to Gaza truce
        </h2>
      </div>
    </section>
  );
}
