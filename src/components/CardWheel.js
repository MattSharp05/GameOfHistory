"use client";

import styles from './CardWheel.module.css';
import { useState } from 'react';
import InfoModal from './InfoModal';

export default function CardWheel({ cards, title, cardStyle }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className={styles.section}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div className={styles.cardWheelContainer}>
        <div className={styles.cardWheel}>
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`${styles.card} ${cardStyle === 'global' ? styles.globalCard : ''}`}
              onClick={() => handleCardClick(card)}
            >
              <h2>{card.title}</h2>
            </div>
          ))}
        </div>
      </div>
      <InfoModal 
        isOpen={selectedCard !== null} 
        onClose={handleCloseModal}
        title={selectedCard?.title}
      />
    </div>
  );
} 