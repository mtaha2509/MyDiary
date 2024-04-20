import React from "react";
import "./Footer.css";
import { Box } from "@mui/material";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Footer_Design} from "../../../assets";

function Footer() {
	return (
		<Box>
			<footer className="footer">
				<div className="footer-links">
					<Container>
						<Row>
							<Col lg="3">
								<img src={Footer_Design} alt="Footer Logo" />
							</Col>
							<Col lg="3">
								<div className="footer-column">
									<h2 style={{ fontSize: "20px", fontWeight: 'bold' }}>Company</h2>
									<ul style={{ listStyleType: 'none', padding: 0, color: 'black' }}>
										<li><a href="#">About Us</a></li>
										<li style={{ whiteSpace: 'nowrap' }}><a href="#">Partner Program</a></li>
										<li><a href="#">Career</a></li>
										<li><a href="#">Contact Us</a></li>
										<li><a href="#">Privacy Policy</a></li>
									</ul>
								</div>
							</Col>
							<Col lg="3">
								<div className="footer-column">
									<h2 style={{ fontSize: "20px", fontWeight: 'bold', whiteSpace: 'nowrap' }}>Social Media</h2>
									<a href="#">
										<i className="fab fa-facebook-f"></i>
										<span>Facebook</span>
									</a>
									<a href="#">
										<i className="fab fa-instagram"></i>
										<span>Instagram</span>
									</a>
									<a href="#">
										<i className="fab fa-twitter"></i>
										<span>Twitter</span>
									</a>
									<a href="#">
										<i className="fab fa-youtube"></i>
										<span>Youtube</span>
									</a>
								</div>
							</Col>
							<Col lg="3">
								<div className="footer-column">
									<h2 style={{ fontSize: "20px", fontWeight: 'bold', whiteSpace: 'nowrap' }}>Contact Us</h2>
									<a href="#">Lahore</a>
									<a href="#">Karachi</a>
									<a href="#">Islamabad</a>
									<a href="#">Faislabad</a>
								</div>
							</Col>
						</Row>
						<hr className="footer-line" style={{ marginTop: '40px' }} />
						<Row>
							<Col lg="12">
								<div className="footer-bottom">
									<p className="text-center" style={{ marginTop: '40px' }}>
										© 2024 MyDiary+, Inc. All rights reserved
									</p>
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