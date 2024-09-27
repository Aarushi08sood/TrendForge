import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Footer from './components/Footer.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Verify from './components/Verify.js';


function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar is outside of Routes to be visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" component={Verify} />
      </Routes>
      <Footer />  {/* Footer is outside of Routes to be visible on all pages */}
    </Router>
  );
}

export default App;
