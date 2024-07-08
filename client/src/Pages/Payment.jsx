// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Styles/Payment.css';

// const Payment = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [data, setData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);

//     const loggedInUsername = localStorage.getItem('Username');
//     console.log('Logged in username:', loggedInUsername);

//     useEffect(() => {
//         fetchData(); 
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/maintenance-fees');
//             console.log('Response from backend:', response.data); 
//             const userData = response.data.filter(item => item.Username === loggedInUsername);
//             console.log('Filtered data:', userData); 
//             setData(userData);
//             setFilteredData(userData);
//         } catch (error) {
//             console.error('Error fetching data:', error.message); 
//         }
//     };

//     const handleSearch = () => {
//         const filtered = data.filter(item =>
//             item.description.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredData(filtered);
//     };

//     return (
//         <div className="box">
//             <h1>Your Maintenance Information</h1>
//             <div className="search-container">
//                 <input
//                     type="text"
//                     placeholder="Search...."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="search-input"
//                 />
//                 <button onClick={handleSearch} className="search-button">Search</button>
//             </div>
//             <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Serial No.</th>
//                             <th>Amount</th>
//                             <th>Due Date</th>
//                             <th>Description</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredData.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{item.amount}</td>
//                                 <td>{new Date(item.dueDate).toLocaleDateString()}</td>
//                                 <td>{item.description}</td>
//                                 <td>
//                                     <button onClick={() => alert(`Paying for ${item.description}`)} className="action-button">
//                                         Pay Now
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Payment;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Payment.css';

const Payment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const loggedInUsername = localStorage.getItem('Username');
    const navigate = useNavigate();
    console.log('Logged in username:', loggedInUsername);

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/maintenance-fees');
            console.log('Response from backend:', response.data);
            const userData = response.data.filter(item => item.Username === loggedInUsername);
            console.log('Filtered data:', userData);
            setData(userData);
            setFilteredData(userData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const handleSearch = () => {
        const filtered = data.filter(item =>
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handlePayNow = (item) => {
        navigate('/payment-details', { state: { paymentData: item } });
    };

    return (
        <div className="box">
            <h1>Your Maintenance Information</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.amount}</td>
                                <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button onClick={() => handlePayNow(item)} className="action-button">
                                        Pay Now
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payment;
