import "./Footer.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

function Footer() {
  const handleClick = (id) => {
    setTimeout(() => {
      const section = document.querySelector(id);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  return (
    <div className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <ul className="social_icon">
        <li>
          <a href="https://www.facebook.com/">
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/">
            <TwitterIcon />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com">
            <LinkedInIcon />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/">
            <InstagramIcon />
          </a>
        </li>
      </ul>
      <ul className="menu">
        <li onClick={() => handleClick("#about-header")}>
          <Link to="/about">About</Link>
        </li>
        <li onClick={() => handleClick("#services")}>
          <Link to="/about">Services</Link>
        </li>
        <li onClick={() => handleClick("#team")}>
          <Link to="/about">Team</Link>
        </li>
        <li onClick={() => handleClick("#contact")}>
          <Link to="/about">Contact</Link>
        </li>
      </ul>
      <p>{"©" + new Date().getFullYear() + " A Good Watch | All Rights Reserved"}</p>
    </div>
  );
}

export default Footer;
