"use client";

import styles from './Progress.module.css';

export default function Progress({ index, performance }) {

  return (
    <div className={styles.container}>
        <div className={styles.topSection}>
            <div className={styles.progressLabel}>
                <p className={styles.labelFont}>Progress</p>
            </div>  
            <div className={styles.progressDisplay}>
                <p className={styles.progressFont}>{index+1}/5</p>
            </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.roundsWrapper}>
          {performance.map((score, i) => (
            <div key={i} className={styles.round}>
              <div className={styles.roundLabel}>{score ?? '-'}</div>
              <div
                className={styles.roundBar}
                style={{
                  backgroundColor: score != null
                    ? `hsl(${(score / 1000) * 120}, 100%, 50%)`
                    : '#ccc',
                }}
              ></div>
            </div>
          ))}
          </div>
        </div>
    </div>
  );
}
