// Route for dynamic game url

"use client";

import styles from './page.module.css';
import Header from '../../../components/Navbar/Header';
import YearsWheel from '../../../components/YearsWheel/YearsWheel';
import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import Progress from '@/components/Progress/Progress';
import BackSidePicture from '@/components/PictureFrame/BackSide/BackSidePicture';
import FrontSidePicture from '@/components/PictureFrame/FrontSide/FrontSidePicture';


export default function PictureGame() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { gameData } = useGame();
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState([null, null, null, null, null]);

  const currentImage = gameData.images[currentIndex];

  const handleAnswer = () => {
    const actualYear = currentImage.year;
    const difference = Math.abs(selectedYear - actualYear);
    const k = 0.05;     // exponential decay rate 

    // Calculate the score based on the difference
    const roundScore = Math.round(1000 * Math.exp(-k * difference));

    const newScores = [...scores];
    newScores[currentIndex] = roundScore;
    setScores(newScores);

    setIsFlipped(true);
  };

  // Go to next image
  const handleNext = () => {
    setIsFlipped(false);
    setSelectedYear(null);
    setCurrentIndex((prev) => Math.min(prev + 1, gameData.images.length - 1));
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1>Picture Game Mode</h1>
        {/* Game content will go here */}
      </div>
      <div className={styles.gameContainer}>
        <div className={styles.leftSection}>
          <Progress index={currentIndex} performance={scores}/>
        </div>
        <div className={styles.rightSection}>
          <div className={`${styles.imageCard} ${isFlipped ? styles.flipped : ''}`}>
            <div className={styles.cardInner}>

              {/* Front side (image) */}
              <FrontSidePicture currentImage={currentImage} />
              
              {/* Back side (feedback) */}
              <BackSidePicture
                scores={scores}
                currentImage={currentImage}
                currentIndex={currentIndex}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                handleNext={handleNext}
              />
            </div>
          </div>

          <div className={styles.timeline}>
            <YearsWheel setSelectedYear={setSelectedYear} />
          </div>
          <button className={styles.answerButton} onClick={handleAnswer}>Answer</button>
        </div>
      </div>
    </div>
  );
} 