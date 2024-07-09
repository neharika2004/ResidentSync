import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LoginForm from './Components/LoginForm/login';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDashboard from './Pages/UserDashboard';
// import QRScanner from './Pages/QRScanner';
import Invite from './Pages/Invite';
import Payment from './Pages/Payment';
import PaymentDetails from './Pages/PaymentDetails';
import { AuthProvider } from './Components/LoginForm/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/dashboard' element={<UserDashboard />} />
            <Route path='/invite' element={<Invite />} />
            <Route path='/payment' element={<Payment />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            {/* <Route path='/scan' element={<QRScanner />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
