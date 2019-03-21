/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import '../css/Header.css';

const Header = ({ login, logout, avatar }) => {
  const [menuOpen, toggleMenu] = useState(false);
  return (
    <>
      {menuOpen && <div className="loseFocusMenu" onClick={() => toggleMenu(!menuOpen)} />}
      <header id="container">
        <input
          id="toggle"
          checked={menuOpen}
          onChange={() => toggleMenu(!menuOpen)}
          type="checkbox"
        />
        <label className="toggle-container" htmlFor="toggle">
          <span className="button button-toggle" />
        </label>
        <nav className="nav">
          {login ? (
            <>
              <Link className="nav-link" to="/" onClick={logout}>
                Log out
              </Link>
              <Link
                className="nav-link"
                to={`/users/${login}`}
                onClick={() => toggleMenu(!menuOpen)}
              >
                My profile
              </Link>
              <Link className="nav-link" to="/new" onClick={() => toggleMenu(!menuOpen)}>
                New Article
              </Link>
            </>
          ) : (
            <Link className="nav-link" to="login" onClick={() => toggleMenu(!menuOpen)}>
              Log in/register
            </Link>
          )}

          <Link className="nav-link" to="/articles" onClick={() => toggleMenu(!menuOpen)}>
            Articles
          </Link>
          <Link className="nav-link" to="/users" onClick={() => toggleMenu(!menuOpen)}>
            Users
          </Link>
        </nav>
        <div className="user-div">
          {login ? (
            <Link to={`/users/${login}`} className="nav-user">
              <img className="nav-avatar" alt="your avatar" src={avatar} />
            </Link>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>
        <div className="branding">
          <Link to="/">
            <img
              className="nav-logo nav-brand"
              src="https://cdn3.iconfinder.com/data/icons/lineo-social/100/news-512.png"
              alt="logo"
            />
          </Link>
          <span className="nav-brand">
            &lt;
            {' '}
            <span className="nc">NC </span>
            News. /&gt;
          </span>
        </div>
      </header>
      <div className="header-gap" />
    </>
  );
};
Header.propTypes = {
  login: PropTypes.string,
  logout: PropTypes.func.isRequired,
  avatar: PropTypes.string,
};
export default Header;
