import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o TheHive <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um Blog feito com React, Next no front-end e Firebase
        no back-end. Desafio desenvolvido por Guilherme.
      </p>
      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
};

export default About;
