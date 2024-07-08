import React from 'react'
import "./../Styles/Home.css"
import SignupForm from '../Components/SignUpForm/signup'
const Home = () => {
  return (
    <section className="hero-wrapper">
        <div className="hero-container">

            <div className="hero-left">

                <div className="hero-title">
                    <h1>
                    Visitor, Society and Accounting Management System
                    </h1>
                </div>

                <div className="hero-des">
                    <span>A world-class technology to make your daily life more convenient and safe.</span>
                    <br/>
                    <span>Now securing <span className='red'>21,000+</span> societies under our hood.</span>
                </div>
                <br/>
               <SignupForm/>          
            </div>

            <div className="hero-right">
                <div className="image-container">
                    <img src="./homeImage.jpg" alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home