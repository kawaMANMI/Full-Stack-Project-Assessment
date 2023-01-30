import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <hr/>
      <div>Copyright © 2023 Kawa from CYF</div>
      <div>
        <a href="#https://www.linkedin.com/in/kawa-manmi-5244ab53/">Privacy Policy</a>
        <a href="#https://www.linkedin.com/in/kawa-manmi-5244ab53/">Terms of Use</a>
      </div>
      <div>
        <a href="#https://www.linkedin.com/in/kawa-manmi-5244ab53/">
          <FaFacebook size={32} />
        </a>
        <a href="#https://www.linkedin.com/in/kawa-manmi-5244ab53/">
          <FaTwitter size={32} />
        </a>
        <a href="#https://www.linkedin.com/in/kawa-manmi-5244ab53/">
          <FaInstagram size={32} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
