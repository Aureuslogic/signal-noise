import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        Aulteus <span>Logic</span>
      </div>
      <div className={styles.tagline}>Clarity before action</div>
    </header>
  );
}
