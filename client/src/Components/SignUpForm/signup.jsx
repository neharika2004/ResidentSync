import React, { useState } from 'react';
import './signup.css'; // Make sure to import the CSS file
import axios from 'axios'

function SignUpForm() {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [phone,setPhone]=useState()
    const [password,setPassword]=useState()


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/',{name,email,phone,password})
        .then(result => {console.log(result)
            alert('Signup successful! Now click on the login button.');

                setName('');
                setEmail('');
                setPhone('');
                setPassword('');
        })
        .catch(err=>{console.log(err)
            alert('Error creating user, please try again.');
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <div className="label-container">
                        <label htmlFor="name">Name:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="label-container">
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="label-container">
                        <label htmlFor="phone">Phone:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="label-container">
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    {/* <input type="button" value="Sign Up" /> */}
                    <button  className="button-group" type="submit">Sign-Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;
