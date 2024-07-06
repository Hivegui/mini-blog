// Importações
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";


const Navbar = () => {
  // Desestruturação para obter a função de logout do hook de autenticação
  const { logout } = useAuthentication();
  // Desestruturação para obter o usuário atual do contexto de autenticação
  const { user } = useAuthValue();

  return (
    <nav className={styles.navbar}>
      {/* Link para a página inicial com a marca "Car Washed" */}
      <NavLink className={styles.brand} to="/">
        Car <span>Washed</span>
      </NavLink>
      <ul className={styles.links_list}>
        {/* Link para a página inicial */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {/* Se o usuário não estiver logado, mostra os links de login e cadastro */}
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {/* Se o usuário estiver logado, mostra os links de agendar horário e dashboard */}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Agendar Horário
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        {/* Link para a página sobre */}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {/* Se o usuário estiver logado, mostra o botão de sair */}
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;