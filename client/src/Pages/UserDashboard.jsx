import React from 'react'
import "./../Styles/UserDashboard.css"
import FeatureCard from '../Components/Cards/FeatureCard'
const UserDashboard = () => {
  return (
    <section className="hero-wrapper">
        <div className='container'>

            <div className="hero-left">

                <div className='title'>
                    <h1>
                    Guest Management Made Simple
                    </h1>
                </div> 

                <div>
                  <FeatureCard/>
                </div>
            </div>

            <div className="hero-right">
                <div className="image-container">
                    <img src="./dashboard.png" alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default UserDashboard