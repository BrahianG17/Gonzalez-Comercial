import { useState } from 'react';

const Header = ({ onLogout, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">GC</div>
            <span className="logo-text">Gonzalez Comercial</span>
          </div>

          {/* Desktop Navigation */}
          <nav>
            <a href="#" className="active">Inicio</a>
            <a href="#">Finanzas</a>
            <a href="#">hdp</a>
            <a href="#">Contacto</a>
            <a href="#">Blog</a>
          </nav>

          {/* User Menu */}
          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <span>{user?.email}</span>
            </div>
            <button onClick={onLogout} className="logout-btn">
              Cerrar Sesión
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-btn"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <a href="#" className="active">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Nosotros</a>
            <a href="#">Contacto</a>
            <a href="#">Blog</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 