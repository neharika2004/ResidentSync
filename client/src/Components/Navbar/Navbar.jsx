// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react'
// import "./Navbar.css"
// const Navbar = () => {
//   return (
//     <section className="h-wrapper">
//         <div className="h-container">
//         <a href="/" style={{fontSize:25}}>ResidentSync</a>

//             <div className="h-menu">
//                 <a href="">Socienty</a>
//                 <a href="">Our Values</a>
//                 <a href="">About Us</a>
//                 <a href="/payment">Payment</a>
//                 <button className='button'>
//                 <a href="/login">Login</a>
//                 </button>
//             </div>
//         </div>
//     </section>
//   )
// }

// export default Navbar

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../LoginForm/AuthContext';
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <section className="h-wrapper">
      <div className="h-container">
        <Link to="/" style={{ fontSize: 25 }}>ResidentSync</Link>

        <div className="h-menu">
          <Link to="">Society</Link>
          <Link to="">Our Values</Link>
          <Link to="">About Us</Link>
          <Link to="/payment">Payment</Link>
          {isLoggedIn ? (
            <button className='button' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className='button'>
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Navbar;
