/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import "./features.css"
import { Link } from 'react-router-dom';
const FeatureCard = () => {
  return (
    <div className='cards'>
      <div className="card">
        <img src="./image1.png" alt="" className='card_img' />
        <div className="card__info">
          <span className='card__category'>Invite Visitors with a Click</span>
          <div className='card_title'>Allow them instant entry at the gate, no more long waits.</div>
          <Link to="/invite">
            <button>Invite</button>
          </Link>
        </div>
      </div>

      
    </div>
  )
}

export default FeatureCard