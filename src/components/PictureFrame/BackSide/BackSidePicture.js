import styles from './BackSidePicture.module.css';

export default function BackSidePicture({ scores, currentImage, currentIndex, selectedYear, setSelectedYear, handleNext }) {

  return (
    <div className={styles.cardBack}>
        <div className={styles.topSection}>
            <div className={styles.pointsRatioBar}>
            <div className={styles.pointsRatioFill} style={{ width: `${(scores[currentIndex] ?? 0) / 10}%` }}
            />
            </div>
        </div>
        <div className={styles.bottomSection}>
            <div className={styles.funFactSection}>
            <div className={styles.funFactTitle}>
                <p>Fun Fact</p>
            </div>
            <div className={styles.funFactText}>
                <p>{currentImage.fun_fact}</p>
            </div>
            </div>
            <div className={styles.pointsContainer}>
            <div className={styles.pointsSection}>
                <div className={styles.feedbackRow}>
                <p className={styles.staticLabel}>Your Answer</p>
                <p className={styles.yearLabel}>{selectedYear !== null ? selectedYear : 'N/A'}</p>
                </div>
                <div className={styles.feedbackRow}>
                <p className={styles.staticLabel}>Correct Year</p>
                <p className={styles.yearLabel} style={{color: '#986ac7'}}>{currentImage.year}</p>
                </div>
                <div className={styles.feedbackRow} style={{marginTop: '10px'}}>
                <p className={styles.staticLabel}>Years Off</p>
                <p className={styles.yearLabel}>
                    {selectedYear !== null ? 
                    `${selectedYear - currentImage.year > 0 ? '+' : ''}${selectedYear - currentImage.year}` 
                    : 'N/A'}
                </p>
                </div>
            </div>
            <div className={styles.pointsSection}>
                <p className={styles.pointsLabel}>Points Earned</p>
                <p className={styles.pointsNumber}>+{scores[currentIndex]}</p>
            </div>
            </div>
            <button className={styles.nextButton} onClick={handleNext}>Next</button>
        </div>
    </div>
  );
} 