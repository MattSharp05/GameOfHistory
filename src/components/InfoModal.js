"use client";

import styles from './InfoModal.module.css';
import { useRouter } from 'next/navigation';

export default function InfoModal({ isOpen, onClose, title }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handlePlay = () => {
    // Navigate to the picture game mode
    router.push('/modes/picture');
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className={styles.content}>
          {/* Add your content here */}
          <p>Information about the Picture category will go here.</p>
        </div>
        <button className={styles.playButton} onClick={handlePlay}>Play</button>
      </div>
    </div>
  );
} 