import styles from './FrontSidePicture.module.css';

export default function FrontSidePicture({ currentImage }) {

  return (
    <div className={styles.cardFront}>
        <img 
            src={currentImage.url} 
            alt={currentImage.name} 
            className={styles.image}
        />
        <div className={styles.imageOverlay}>
            <div className={styles.imageName}>{currentImage.name}</div>
            <div className={styles.imageDescription}>{currentImage.description}</div>
        </div>
    </div>
  );
} 