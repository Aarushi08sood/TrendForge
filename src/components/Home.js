import React from 'react'
import Logo1 from '../assets/Logo1.svg'
import { useNavigate } from 'react-router-dom';




const Home = () => {


  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login'); // Replace with your target route
  };

  const handleClick1 = () => {
    navigate('/Register'); // Replace with your target route
  };

  return (
    
      <div className="container col-xxl-8 px-4 py-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
      <img src={Logo1} alt="" />
      </div>
      <div className="col-lg-6">
        <h1 className="display-8 fw-bold text-body-emphasis lh-1 mb-3">TrendForge</h1>
        <p className="lead">Empowering users to explore company metrics and trends through real-time analysis, providing deep insights and predictive capabilities for smarter decision-making.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-start">
          <button type="button" onClick={handleClick} className="btn btn-primary btn-lg px-4 me-md-2 SignInButton">Sign In</button>
          <button type="button" onClick={handleClick1} className="btn btn-outline-secondary btn-lg px-4 SignUpButton">Register</button>
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default Home
