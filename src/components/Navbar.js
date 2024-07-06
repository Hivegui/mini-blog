// Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaCarAlt } from "react-icons/fa";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout } = useAuthentication();
  const { user } = useAuthValue();
  const [showMenu, setShowMenu] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setIsRotated(!isRotated);
  };

  const handleNavLinkClick = () => {
    setShowMenu(false);
  };

  return (
    <nav className={`${styles.navbar} ${showMenu ? styles.showMenu : ""}`}>
      <div className={styles.brand}>
        <NavLink to="/" onClick={() => setShowMenu(false)}>
          Car <span>Washed</span>
        </NavLink>
      </div>
      <div
        className={`${styles.menuIcon} ${showMenu ? styles.rotate : ""}`}
        onClick={toggleMenu}
      >
        <FaCarAlt />
      </div>
      <ul
        ref={menuRef}
        className={`${styles.links_list} ${showMenu ? styles.show : ""}`}
      >
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
        <li>
          <NavLink to="/about" onClick={handleNavLinkClick}>
            Sobre
          </NavLink>
        </li>
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
