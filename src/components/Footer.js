import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
       
        <div className="footer-section">
          <h3>SUBSCRIBE NEWSLETTER</h3>
          <div className="underline"></div>
          <p>
            Subscribe to our newsletters now and stay up to date with new
            collections and exclusive offers.
          </p>
          <div className="newsletter">
            <input type="email" placeholder="Enter e-mail here..." />
            <button>
              <FaPaperPlane />
            </button>
          </div>
        </div>

       
        <div className="footer-section">
          <h3>MY ACCOUNT</h3>
          <div className="underline"></div>
          <ul>
            <li>My Account</li>
            <li>Order History</li>
            <li>Wishlist</li>
          </ul>
        </div>

    
        <div className="footer-section">
          <h3>INFORMATION</h3>
          <div className="underline"></div>
          <ul>
            <li>About Us</li>
            <li>Shipping & Return Policy</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Contact Us</li>
          </ul>
        </div>

       
        <div className="footer-section">
          <h3>CONTACT</h3>
          <div className="underline"></div>
          <p>
            Support - <a href="mailto:Hello@Alistos.In">Hello@Alistos.In</a>
          </p>
          <p>Address: Chandigarh, India</p>
        </div>
      </div>

      
      <div className="footer-bottom">
        <div className="social-icons">
          <FaFacebookF />
          <FaInstagram />
        </div>
        <p>Alistos © 2025</p>
        <div className="payment-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/American_Express_logo_%282018%29.svg" alt="Amex" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Discover_Card_logo.png" alt="Discover" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
