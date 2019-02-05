import React from 'react';
import { Link } from '@reach/router';
import './Header.css';

const Header = ({ login, logout, avatar }) => {
  const links = ['articles', 'users'];
  return (
    <header id="container">
      {/* <Link to="/">
        <img
          className="nav-logo nav-brand"
          src="https://cdn3.iconfinder.com/data/icons/lineo-social/100/news-512.png"
          alt="logo"
        />
      </Link>
      <span className="nav-brand">NC News.</span>
      {login && (
        <>
          <a href={`/users/${login}`}>
            <img className="nav-avatar" alt="your avatar" src={avatar} />
          </a>
        </>
      )} */}
      <input id="toggle" type="checkbox" />
      <label class="toggle-container" htmlFor="toggle">
        <span class="button button-toggle" />
      </label>
      <nav className="nav">
        {login ? (
          <Link className="nav-link" to="/" onClick={logout}>
            (log out)
          </Link>
        ) : (
          <Link className="nav-link" to="login">
            Log in
          </Link>
        )}
        {links.map(link => (
          <Link key={link} className="nav-link" to={`/${link}`}>
            {link}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
