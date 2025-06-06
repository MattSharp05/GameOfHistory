"use client";

import styles from './InfoModal.module.css';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';

export default function InfoModal({ isOpen, onClose, title, description }) {
  const router = useRouter();
  const { setGameData } = useGame();

  if (!isOpen) return null;

  const handlePlay = async () => {
    try {
      const mode = title.toLowerCase().replace(/\s/g, '-'); // e.g., 'Famous People' = 'famous-people'
      const res = await fetch(`/api/start-game/${mode}`, { method: 'GET' });
      const data = await res.json();

      setGameData(data);  // store game data in context
      router.push(`/game/${data.gameId}`);
    } catch (err) {
      console.error('Failed to start game:', err);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className={styles.content}>
          {/* Add your content here */}
          <p>{description}</p>
        </div>
        <button className={styles.playButton} onClick={handlePlay}>Play</button>
      </div>
    </div>
  );
} 