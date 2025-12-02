import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/decoarc",
      image: "/assets/components/Footer/github.svg",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/andrearcodaci",
      image: "/assets/components/Footer/linkedin.svg",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/arcowill",
      image: "/assets/components/Footer/instagram.svg",
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">Logo Prototype by Me</div>

          <div className="social-links">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.name}
              >
                <img
                  src={social.image}
                  alt={social.name}
                  className="social-icon"
                />
              </a>
            ))}
          </div>

          <p className="footer-copyright">© 2025 Me. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
