import './Footer.css';
import {Link} from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
  return (
    <div className="footer">
    <div className="waves">
                <div class="wave" id="wave1"></div>
                <div class="wave" id="wave2"></div>
                <div class="wave" id="wave3"></div>
                <div class="wave" id="wave4"></div>
            </div>

            <ul className="social_icon">
                <li>
                  <a href="https://www.facebook.com/"><FacebookIcon clasName={"logo-facebook"}/></a>
                </li>
                <li>
                  <a href="https://twitter.com/"><TwitterIcon className={"logo-twitter"}/></a>
                </li>
                <li>
                  <a href="https://www.linkedin.com"><LinkedInIcon className={"logo-linkedin"}/></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/"><InstagramIcon className={"logo-instagram"}/></a>
                </li>
            </ul>
            <ul className="menu">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/">Services</Link></li>
                <li><Link to="/">Team</Link></li>
                <li><Link to="/">Contact</Link></li>
            </ul>
            <p>©2022 A Good Watch | All Rights Reserved</p>
  </div>
  )
}

export default Footer