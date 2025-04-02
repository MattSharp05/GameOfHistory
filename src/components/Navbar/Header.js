import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Logo will go here */}
        <span>Game of History</span>
      </div>
      
      <nav className={styles.nav}>
        <a href="/modes" className={styles.navLink}>Modes</a>
        <a href="/leaderboard" className={styles.navLink}>Leaderboard</a>
        <a href="/community" className={styles.navLink}>Community</a>
      </nav>

      <div className={styles.profile}>
        <div className={styles.profileImage}>
          {/* Profile image will go here */}
        </div>
        <span className={styles.profileName}>John Doe</span>
      </div>
    </header>
  );
} 