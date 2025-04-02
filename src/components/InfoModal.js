"use client";

import styles from './InfoModal.module.css';

export default function InfoModal({ isOpen, onClose, title }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className={styles.content}>
          {/* Add your content here */}
          <p>Information about the Picture category will go here.</p>
        </div>
        <button className={styles.playButton}>Play</button>
      </div>
    </div>
  );
} 