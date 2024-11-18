import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const onLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Help Desk App</h1>
        <div className="navbar-links">
          {!token && (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
          {token && (
            <>
             {/* {JSON.parse(localStorage.getItem('user')).email === 'agent@gmail.com'  &&
                <Link to="/">All Tickets</Link>
             }
             {JSON.parse(localStorage.getItem('user')).email === 'admin@gmail.com'  &&
                <Link to="/">All Tickets</Link>
             } */}
             {
              JSON.parse(localStorage.getItem('user')).email !== 'agent@gmail.com' && JSON.parse(localStorage.getItem('user')).email !== 'admin@gmail.com' &&
                <><Link to="/">My Tickets</Link>
                <Link to="/create-ticket">Add Ticket</Link>
                </>
             }
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
