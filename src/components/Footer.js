import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Car Washed &copy;{" "}
        <a
          href="https://www.linkedin.com/in/guilhermefariasgomes/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Guilherme Gomes
        </a>{" "}
        - 2024
      </p>
    </footer>
  );
};

export default Footer;
