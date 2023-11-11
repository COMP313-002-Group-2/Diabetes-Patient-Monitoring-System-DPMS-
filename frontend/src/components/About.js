import React from 'react';
import myImage from '../assets/aboutus.jpeg';

const AboutUs = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>About Us</h1>
      <h2 style={{ textAlign: 'center' }}>Welcome to our website!</h2>

      <div>
        < p>
          We are a passionate team dedicated to providing high-quality products and services to our customers. Our mission is to make a positive impact on the world by delivering innovative solutions and exceptional experiences. We believe in transparency, integrity, and customer satisfaction.
        </p>
      </div>


      <div style={{ textAlign: 'center', padding: '20px' }}>
        <img src={myImage} alt="About Us Page" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '300px', height: '200px' }} />
      </div>


      <div>
        <p>

          Our primary objective is to present the DPMS as a holistic solution, aiming to improve patient outcomes and simplify healthcare workflows for diabetic care.
          The Diabetes Patient Monitoring System (DPMS) project aims to revolutionize diabetes care by providing an integrated online platform for patients and healthcare providers.
          This system offers secure storage of lab results, medication management, educational resources, insulin dosage guidance, critical results monitoring, and virtual health consultations.
        </p>
      </div>
      <h3 style={{ textAlign: 'center' }}>If you have any questions, feedback, or inquiries, please don't hesitate to contact us. We're here to serve you and look forward to hearing from you.
      </h3>
    </div>
  );
};

export default AboutUs;
