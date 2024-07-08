import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import './../Styles/QRScanner.css';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [scanning, setScanning] = useState(true);

  const handleScan = async (result) => {
    if (result && scanning) {
      const data = result.text;
      setScanResult(data);
      setScanning(false);
      console.log('Scanning stopped');

      try {
        const response = await axios.post('http://localhost:3001/verify-invitation', { qrCodeContent: data });

        if (response.data.success) {
          setVerificationResult('Invitation verified, grant access.');
        } else {
          setVerificationResult('Invalid or expired QR code.');
        }
      } catch (error) {
        console.error('Error verifying invitation:', error);
        setVerificationResult('Error verifying invitation');
      }
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner Error:', err);
  };

  useEffect(() => {
    console.log('QRScanner component re-rendered');
  }, [scanResult, verificationResult]); // Only re-run the effect if scanResult or verificationResult changes

  return (
    <div className="qr-scanner-container">
      <QrReader
        delay={300}
        onError={handleError}
        onResult={handleScan}
        className="qr-scanner"
        constraints={{ facingMode: 'environment' }}
      />
      <p className="scan-result">Scan Result: {scanResult}</p>
      <p className="verification-result">Verification Result: {verificationResult}</p>
    </div>
  );
};

export default QRScanner;
