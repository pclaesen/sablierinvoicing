// Header.js
import Link from 'next/link';
import styles from '../../styles/header.module.css'; // Adjust the path as needed

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/user-dashboard" className={styles.link}>
          Dashboard
        </Link>
        <Link href="/user-profile" className={styles.link}>
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
