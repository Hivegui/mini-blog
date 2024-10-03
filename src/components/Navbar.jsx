import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        TheHive <span>Blog</span>
      </NavLink>
      {/* Ícone para abrir o menu em telas menores */}
      <div
        className={`${styles.menuIcon} ${menuOpen ? styles.rotate : ""}`}
        onClick={toggleMenu}
      >
        ☰
      </div>
      <ul className={`${styles.links_list} ${menuOpen ? styles.show : ""}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={handleNavLinkClick}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={handleNavLinkClick}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={handleNavLinkClick}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={handleNavLinkClick}
              >
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={handleNavLinkClick}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={handleNavLinkClick}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button
              onClick={() => {
                logout();
                handleNavLinkClick();
              }}
              className={styles.logoutButton}
            >
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
