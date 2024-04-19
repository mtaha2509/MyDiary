import React from "react";
import "./Footer.css";
import { Box } from "@mui/material";

function Footer() {
    return (
        <Box>
            <footer className="footer">
                <div className="container">
                <h1
                    style={{
                        color: "green",
                        textAlign: "center",
                        marginTop: "10px",
                        fontSize: "250%",
                    }}
                >
                    A World of Expressing Yourself
                </h1>
				</div>
				<div className="footer-links">
					<div className="footer-column">
						<h2 style={{ fontSize: "20px", fontWeight: 'bold' }}>Company</h2>
						<ul style={{ listStyleType: 'none', padding: 0, color: 'black' }}>
							<li><a href="#">About Us</a></li>
							<li><a href="#">Partner Program</a></li>
							<li><a href="#">Career</a></li>
							<li><a href="#">Contact Us</a></li>
							<li><a href="#">Privacy Policy</a></li>
						</ul>
					</div>
					<div className="footer-column">
						<h2 style={{ fontSize: "20px", fontWeight: 'bold' }}>Services</h2>
							<a href="#">Writing</a>
							<a href="#">Internships</a>
							<a href="#">Coding</a>
							<a href="#">Teaching</a>
					</div>
					<div className="footer-column">
						<h2 style={{ fontSize: "20px", fontWeight: 'bold' }}>Contact Us</h2>
							<a href="#">Lahore</a>
							<a href="#">Karachi</a>
							<a href="#">Islamabad</a>
							<a href="#">Faislabad</a>
					</div>
					<div className="footer-column">
						<h2 style={{ fontSize: "20px", fontWeight: 'bold' }}>Social Media</h2>
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
					</div>

            </footer>
        </Box>
    );
}

export default Footer;


/*// Filename - components/Footer.js

import React from "react";
import {
	Box,
	FooterContainer,
	Row,
	Column,
	FooterLink,
	Heading,
} from "./FooterStyles";

const Footer = () => {
	return (
		<Box>
			
			<FooterContainer>
				<Row>
					<Column>
						<Heading>About Us</Heading>
						<FooterLink href="#">
							Aim
						</FooterLink>
						<FooterLink href="#">
							Vision
						</FooterLink>
						<FooterLink href="#">
							Testimonials
						</FooterLink>
					</Column>
					<Column>
						<Heading>Services</Heading>
						<FooterLink href="#">
							Writing
						</FooterLink>
						<FooterLink href="#">
							Internships
						</FooterLink>
						<FooterLink href="#">
							Coding
						</FooterLink>
						<FooterLink href="#">
							Teaching
						</FooterLink>
					</Column>
					<Column>
						<Heading>Contact Us</Heading>
						<FooterLink href="#">
							Uttar Pradesh
						</FooterLink>
						<FooterLink href="#">
							Ahemdabad
						</FooterLink>
						<FooterLink href="#">
							Indore
						</FooterLink>
						<FooterLink href="#">
							Mumbai
						</FooterLink>
					</Column>
					<Column>
						<Heading>Social Media</Heading>
						<FooterLink href="#">
							<i className="fab fa-facebook-f">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Facebook
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-instagram">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Instagram
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-twitter">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Twitter
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-youtube">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Youtube
								</span>
							</i>
						</FooterLink>
					</Column>
				</Row>
			</FooterContainer>
		</Box>
	);
};
export default Footer;
 */