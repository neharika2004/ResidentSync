import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./../Styles/UserDashboard.css";
import FeatureCard from '../Components/Cards/FeatureCard';
import { AuthContext } from '../Components/LoginForm/AuthContext';

const UserDashboard = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <section className="hero-wrapper">
            <div className='container'>
                <div className="hero-left">
                    <div className='title'>
                        <h1>Guest Management Made Simple</h1>
                    </div>
                    <div>
                        <FeatureCard />
                    </div>
                </div>
                <div className="hero-right">
                    <div className="image-container">
                        <img src="./dashboard.png" alt="Dashboard" />
                    </div>
                </div>
                <div className="button-container">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}></button>
                    ) : (
                        <button onClick={() => navigate('/login')}>Login</button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default UserDashboard;
