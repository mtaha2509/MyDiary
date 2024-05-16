import React from 'react';
import './about.css';
import NavBar from '../LandingPage/navbar/navbar';
import '/src/assets/'
import { logo1 } from '../../assets';
import { Footer } from '../LandingPage';

const About = () => {
    return (
        <div>
            <header>
                <div className='fadeIn about-nav'><NavBar /></div>
            </header>
            <main className="about-container">
                <section className="about-section">
                    <h1>About Us</h1>
                    <p>Welcome to MyDiary, your trusted companion for capturing and cherishing your life's moments. Our platform is designed to provide you with a seamless and secure way to document your thoughts, experiences, and memories.</p>
                    
                    <h2>Our Mission</h2>
                    <p>At MyDiary, our mission is to empower individuals to express themselves freely and preserve their personal stories in a safe, private, and accessible manner. We believe in the importance of self-expression and the value of reflecting on one’s journey.</p>
                    
                    <h2>Our Team</h2>
                    <p>We are a diverse group of passionate professionals dedicated to creating a user-friendly and reliable journaling platform. Our team consists of developers, designers, and customer support specialists who work tirelessly to ensure that your experience with MyDiary is exceptional.</p>
                    
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>Easy-to-use interface</li>
                        <li>Secure and private</li>
                        <li>Access from anywhere</li>
                        <li>Regular updates and new features</li>
                        <li>Dedicated customer support</li>
                    </ul>
                </section>
            </main>
            <div className='fadeIn about-footer'><Footer/></div>
        </div>
    );
};

export default About;
