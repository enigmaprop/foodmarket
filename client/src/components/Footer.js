import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col flex-wrap justify-center items-center">
          <h3 className="text-xl font-semibold mb-2">تابعنا على</h3>
          <div className="flex flex-col">
            <Link to="#" className="text-gray-400 hover:text-gray-100">
              <span className="sr-only">Facebook</span>
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-100">
              <span className="sr-only">Twitter</span>
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-100">
              <span className="sr-only">Instagram</span>
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Link>

          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-start items-center">
          <h3 className="text-xl font-semibold mb-2">سياساتنا</h3>
          <nav className="flex flex-col flex-wrap justify-center items-center">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-gray-100">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-gray-100">
              Terms of Service
            </Link>
            <Link to="/refund-policy" className="text-gray-400 hover:text-gray-100">
              Refund Policy
            </Link>
          </nav>
        </div>
        <div className="flex flex-col flex-wrap justify-center items-center">
          <h3 className="text-xl font-semibold mb-2">تواصل معنا</h3>
          <a href="mailto:support@example.com" className="text-gray-400 hover:text-gray-100">
            support@example.com
          </a>
          <p className="text-gray-400 hover:text-gray-100 mt-2">
            +972 599 999 999
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
