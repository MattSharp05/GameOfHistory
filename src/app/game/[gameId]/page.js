// Route for dynamic game url


"use client";

import styles from './page.module.css';
import Header from '../../../components/Header';
import YearsWheel from '../../../components/YearsWheel';

export default function PictureGame() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1>Picture Game Mode</h1>
        {/* Game content will go here */}
      </div>
      <div className={styles.whiteRectangle}></div>
      <div className={styles.timeline}>
        <YearsWheel />
      </div>
      <button className={styles.answerButton}>Answer</button>
    </div>
  );
} 