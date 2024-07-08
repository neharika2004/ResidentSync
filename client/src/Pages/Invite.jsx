import React, { useState } from 'react';
import axios from 'axios';
import "./../Styles/Invite.css"

const Invite = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  // const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:3001/invite', { name, email, phone, purpose, arrivalTime })
  //     .then(response => {
  //       setQrCode(response.data.qrCode);
  //       setName('');
  //       setEmail('');
  //       setPhone('');
  //       setPurpose('');
  //       setArrivalTime('');
  //       setError(null);
  //       alert('QR sent to the Guest!.');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setError('Error in sending, please try again.');
  //     });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/invite', { name, email, phone, purpose, arrivalTime })
      .then(response => {
        setName('');
        setEmail('');
        setPhone('');
        setPurpose('');
        setArrivalTime('');
        setError(null);
        alert('Invitation sent successfully.');
        // Trigger PDF download
        // downloadPDF(response.data.pdfData);
      })
      .catch(err => {
        console.log(err);
        setError('Error in sending, please try again.');
      });
  };

  // const downloadPDF = (pdfData) => {
  //   const blob = new Blob([pdfData], { type: 'application/pdf' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'invitation.pdf';
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   document.body.removeChild(a);
  // };

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
            <label htmlFor="email">Email:</label>
          </div>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="label-container">
            <label htmlFor="purpose">Purpose of Visit:</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="label-container">
            <label htmlFor="arrivalTime">Arrival Time:</label>
          </div>
          <div className="input-container">
            <input
              type="datetime-local"
              id="arrivalTime"
              name="arrivalTime"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <button className="button-group" type="submit">Invite Visitor</button>
        </div>
      </form>
{/* 
      {qrCode && (
        <div className="qr-container">
          <h3>QR Code for Visitor:</h3>
          <img src={qrCode} alt="QR Code" />
        </div>
      )} */}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Invite;
