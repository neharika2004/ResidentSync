import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LoginForm from './Components/LoginForm/login';
import Home from './Pages/Home';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import UserDashboard from './Pages/UserDashboard';
// import QRScanner from './Pages/QRScanner';
import Invite from './Pages/Invite';
import Payment from './Pages/Payment';
import PaymentDetails from './Pages/PaymentDetails';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/dashboard' element={<UserDashboard/>}></Route>
        <Route path='/invite' element={<Invite/>}></Route>
        <Route path='/payment' element={<Payment/>} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        {/* <Route path='/scan' element={<QRScanner/>} /> */}

       </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
