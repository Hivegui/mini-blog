import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Car <span>Washed</span>
      </h2>
      <p>
        Este projeto consiste em um Car Washed feito com React no front-end e Firebase
        no back-end. Desafio desenvolvido por Guilherme.
      </p>
      <Link to="/posts/create" className="btn">
        Washed Car
      </Link>
    </div>
  );
};

export default About;
