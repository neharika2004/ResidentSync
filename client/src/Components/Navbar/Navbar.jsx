/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import "./Navbar.css"
const Navbar = () => {
  return (
    <section className="h-wrapper">
        <div className="h-container">
            <img src="" alt="logo" width={100}/>

            <div className="h-menu">
                <a href="">Socienty</a>
                <a href="">Our Values</a>
                <a href="">About Us</a>
                <a href="/payment">Payment</a>
                <button className='button'>
                <a href="/login">Login</a>
                </button>
            </div>
        </div>
    </section>
  )
}

export default Navbar