'use client';

import styles from './VideoCarousel.module.css';

const videoItems = [
  {
    title: "A home-turned library to tackle the Philippines’ reading crisis",
    image: "https://via.placeholder.com/200x300?text=Video+1",
  },
  {
    title: "Massive explosion at fireworks warehouse in California",
    image: "https://via.placeholder.com/200x300?text=Video+2",
  },
  {
    title: "Trump says Israel agrees terms for ceasefire, urges Hamas to accept",
    image: "https://via.placeholder.com/200x300?text=Video+3",
  },
  {
    title: "Trump tours migrant detention site in Florida Everglades",
    image: "https://via.placeholder.com/200x300?text=Video+4",
  },
  {
    title: "Kim Jong Un shown honouring soldiers killed while fighting for Russia",
    image: "https://via.placeholder.com/200x300?text=Video+5",
  },
  {
    title: "Extreme heat hits Europe, forcing closures and warnings",
    image: "https://via.placeholder.com/200x300?text=Video+6",
  },
  {
    title: "Trump might ‘take a look’ at possible Elon Musk deportation",
    image: "https://via.placeholder.com/200x300?text=Video+7",
  },
  {
    title: "Israeli airstrike hits Gaza beach cafe, killing people",
    image: "https://via.placeholder.com/200x300?text=Video+8",
  },
];

export default function VideoCarousel() {
  return (
    <section className={styles.carouselSection}>
      <h3><span className={styles.orangeBar}></span>WATCH LATEST VIDEOS</h3>
      <div className={styles.scrollContainer}>
        {videoItems.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
