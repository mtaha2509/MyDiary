import React from "react";
import "./Footer.css";
import { Box } from "@mui/material";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Logo2 } from "../../../assets";

function Footer() {
    return (
        <Box>
            <footer className="footer">
                <div className="footer-links">
                    <Container>
                        <Row>
                            <Col lg="4">
                                <img src={Logo2} alt="Footer Logo" />
                            </Col>
                            <Col lg="4">
                                <div className="footer-column">
                                    <h2 style={{ fontSize: "20px", fontWeight: 'bold' }}>Company</h2>
                                    <ul className="footer-list">
                                        <li><a href="/about">About Us</a></li>
                                        <li><a href="/register">Sign Up</a></li>
										<li><a href="/login">Log In</a></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className="footer-column">
                                    <h2 style={{ fontSize: "20px", fontWeight: 'bold', whiteSpace: 'nowrap' }}>Contact Us</h2>
                                    <ul className="footer-list">
                                        <li><a href="mailto:asimf602@gmail.com">Email</a></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                        <hr className="footer-line" style={{ marginTop: '0px' }} />
                        <Row>
                            <Col lg="6">
                                <div className="footer-bottom" style={{ marginTop: '0px' }}>
                                    <p style={{ marginBottom: '0px', marginLeft: '20px' }}>
                                        © 2024 MyDiary+, Inc. All rights reserved
                                    </p>
                                </div>
                            </Col>
                            <Col lg="6">
                                <div className="d-flex justify-content-end">
                                    <a className="FB-Hover" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXoMFtNYy-gfuvVnQkKSiDAmfYt0ynmaGz55WPNbUPZw&s" alt="Facebook" width="27" height="27" style={{ marginRight: '30px'}} />
                                    </a>
                                    <a className="IG-Hover" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="Instagram" width="30" height="30" style={{ marginRight: '30px', borderRadius: '100%' }} />
                                    </a>
                                    <a className="LI-Hover" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" alt="LinkedIn" width="27" height="27" style={{ marginRight: '30px' }} />
                                    </a>
                                    <a className="T-Hover" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv96fZKwjUHR8ipNKPnKyaAHzn3MQUAERWelvryUg1rA&s" alt="Twitter" width="27" height="27" style={{ marginRight: '10px', borderRadius: '80%' }} />
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>
        </Box>
    );
}

export default Footer;
