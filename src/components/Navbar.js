// Importando os módulos necessários do React, Componentes, Hooks, etc.
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom"; 
import { FaCarAlt } from "react-icons/fa"; 
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  // Utilização dos hooks para autenticação e controle de estado
  const { logout } = useAuthentication(); // Função de logout fornecida pelo hook de autenticação
  const { user } = useAuthValue(); // Estado de usuário obtido do contexto de autenticação
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar a exibição do menu
  const [isRotated, setIsRotated] = useState(false); // Estado para controlar a rotação do ícone do menu
  const menuRef = useRef(null); // Referência para o elemento do menu

  // Efeito para fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Adiciona um event listener para capturar cliques fora do menu
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Função para alternar a exibição do menu e a rotação do ícone
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setIsRotated(!isRotated);
  };

  // Função para fechar o menu ao clicar em um link de navegação
  const handleNavLinkClick = () => {
    setShowMenu(false);
  };

  return (
    <nav className={`${styles.navbar} ${showMenu ? styles.showMenu : ""}`}>
      {/* Barra de navegação com a marca do aplicativo */}
      <div className={styles.brand}>
        <NavLink to="/" onClick={() => setShowMenu(false)}>
          Car <span>Washed</span>
        </NavLink>
      </div>

      {/* Ícone do menu, que roda conforme showMenu está ativo */}
      <div
        className={`${styles.menuIcon} ${showMenu ? styles.rotate : ""}`}
        onClick={toggleMenu}
      >
        <FaCarAlt />
      </div>

      {/* Lista de links de navegação */}
      <ul
        ref={menuRef}
        className={`${styles.links_list} ${showMenu ? styles.show : ""}`}
      >
        {/* Links condicionais com base no estado de autenticação */}
        {!user && (
          <>
            <li>
              <NavLink to="/login" onClick={handleNavLinkClick}>
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={handleNavLinkClick}>
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create" onClick={handleNavLinkClick}>
                Agendar Horário
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={handleNavLinkClick}>
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        {/* Link comum para a página 'Sobre' */}
        <li>
          <NavLink to="/about" onClick={handleNavLinkClick}>
            Sobre
          </NavLink>
        </li>
        {/* Botão para sair da sessão, visível apenas se o usuário estiver logado */}
        {user && (
          <li>
            <button onClick={() => { logout(); setShowMenu(false); }}>
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;