// import React, { useState } from 'react';
// import './login.css'; // Make sure to import the CSS file
// import axios from 'axios'
// import {useNavigate } from 'react-router-dom';

// function LoginForm() {
//     const [name,setName]=useState()
//     const [password,setPassword]=useState()
//     const navigate=useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:3001/login',{name,password})
//         .then(result => {
//             console.log(result);
//             if (result.data === "Success") {
//                 navigate('/dashboard');
//             } else {
//                 alert('Record does not exist');
//                 navigate('/');
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             alert('Error occurred, navigating back to home.');
//             navigate('/');
//         });
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit} className="form-container">
//                 <div className="form-group">
//                     <div className="label-container">
//                         <label htmlFor="name">Name:</label>
//                     </div>
//                     <div className="input-container">
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </div>
//                 </div>


//                 <div className="form-group">
//                     <div className="label-container">
//                         <label htmlFor="password">Password:</label>
//                     </div>
//                     <div className="input-container">
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <button className="button-group" type="submit">Login</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default LoginForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function LoginForm() {
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3001/login', { name, password });
//             const { token, username, userId } = response.data; // Extract token, username, and userId from the response
            
//             // Store token, username, and userId in localStorage
//             localStorage.setItem('jwtToken', token);
//             localStorage.setItem('Username', username);
//             localStorage.setItem('UserId', userId);

//             navigate('/dashboard');
//         } catch (error) {
//             console.error('Login error:', error);
//             alert('Login failed. Please check your credentials.');
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit} className="form-container">
//                 <div className="form-group">
//                     <div className="label-container">
//                         <label htmlFor="name">Name:</label>
//                     </div>
//                     <div className="input-container">
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div className="form-group">
//                     <div className="label-container">
//                         <label htmlFor="password">Password:</label>
//                     </div>
//                     <div className="input-container">
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <button className="button-group" type="submit">Login</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default LoginForm;

// LoginForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function LoginForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { name, password });
            const { token, username, userId } = response.data;
            
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('Username', username);
            localStorage.setItem('UserId', userId);

            login();
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
        }
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    <button className="button-group" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;

