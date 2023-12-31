import React from "react";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div className="self-center">
        <h1 className="text-3xl">Sports Zone</h1>
        <p>
          Sports Zone Ltd.
          
        </p>
      </div>
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">SportFit Solutions </a>
        <a className="link link-hover">GamePro Performance</a>
        <a className="link link-hover">Victory Athletics</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
