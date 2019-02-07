import React from 'react';
import { Link } from '@reach/router';
import '../css/Header.css';

const Header = ({ login, logout, avatar }) => (
  <>
    <header id="container">
      <input id="toggle" type="checkbox" />
      <label className="toggle-container" htmlFor="toggle">
        <span className="button button-toggle" />
      </label>
      <nav className="nav">
        {login ? (
          <>
            <Link className="nav-link" to="/" onClick={logout}>
              Log out
            </Link>
            <Link className="nav-link" to={`/users/${login}`}>
              My profile
            </Link>
            <Link className="nav-link" to="/new">
              New Article
            </Link>
          </>
        ) : (
          <Link className="nav-link" to="login">
            Log in
          </Link>
        )}

        <Link className="nav-link" to="/articles">
          Articles
        </Link>
        <Link className="nav-link" to="/users">
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
          &lt; <span className="nc">NC </span>News. /&gt;
        </span>
      </div>
    </header>
    <div className="header-gap" />
  </>
);

export default Header;
