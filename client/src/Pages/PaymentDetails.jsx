// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../Styles/PaymentDetails.css';

// const PaymentDetails = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { paymentData } = location.state;

//     const handlePaymentSubmit = () => {
//         // Dummy payment logic can be implemented here
//         alert(`Payment of ${paymentData.amount} for ${paymentData.description} is successful!`);
//         navigate('/dashboard'); // Redirect back to the main page after payment
//     };

//     return (
//         <div className="payment-details-box">
//             <h1>Payment Details</h1>
//             <div className="payment-card">
//                 <h2>Username: {paymentData.Username}</h2>
//                 <p>Amount: {paymentData.amount}</p>
//                 <p>Due Date: {new Date(paymentData.dueDate).toLocaleDateString()}</p>
//                 <p>Description: {paymentData.description}</p>
//                 <button onClick={handlePaymentSubmit} className="submit-button">
//                     Pay Now
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PaymentDetails;


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/PaymentDetails.css';

const PaymentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { paymentData } = location.state;

    const handlePaymentSubmit = async () => {
        try {
            await axios.post(`http://localhost:3001/update-payment-status/${paymentData._id}`, { isPaid: true });
            alert(`Payment of ${paymentData.amount} for ${paymentData.description} is successful!`);
            navigate('/payment'); // Redirect back to the main page after payment
        } catch (error) {
            console.error('Error updating payment status:', error.message);
            alert('Error processing payment. Please try again.');
        }
    };

    return (
        <div className="payment-details-box">
            <h1>Payment Details</h1>
            <div className="payment-card">
                <h2>Username: {paymentData.Username}</h2>
                <p>Amount: {paymentData.amount}</p>
                <p>Due Date: {new Date(paymentData.dueDate).toLocaleDateString()}</p>
                <p>Description: {paymentData.description}</p>
                <button onClick={handlePaymentSubmit} className="submit-button">
                    Submit Payment
                </button>
            </div>
        </div>
    );
};

export default PaymentDetails;
