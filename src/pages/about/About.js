import "./About.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SideNav from "../../components/sidenav/SideNav";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TypewriterComponent from "typewriter-effect";
import HeaderLogo from "../../assests/images/about.png";
import AboutUsIllustration from "../../assests/illustrations/about-us.svg";
import ServicesIllustration from "../../assests/illustrations/services.svg";
import TeamIllustration from "../../assests/illustrations/team.svg";
import AuthIllustration from "../../assests/illustrations/auth.svg";
import PlayTrailerIllustration from "../../assests/illustrations/play-trailer.svg";
import RecommendationIllustration from "../../assests/illustrations/recommendation.svg";
import WatchListIllustration from "../../assests/illustrations/watch-list.svg";
import HistoryIllustration from "../../assests/illustrations/history.svg";
import ResponsiveIllustration from "../../assests/illustrations/responsive.svg";
import DeveloperIllustration from "../../assests/illustrations/developer.svg";
import MachineLearningIllustration from "../../assests/illustrations/machine-learning.svg";
import DocumentIllustration from "../../assests/illustrations/document.svg";
import TeamMember1 from "../../assests/images/team-member1.gif";
import TeamMember2 from "../../assests/images/team-member2.gif";
import TeamMember3 from "../../assests/images/team-member3.gif";



export default function About() {
  const navigate = useNavigate();
  return (
    <div className="about">
      <Navbar />
      <SideNav />
      <section className="v-center" id="about-header">
        <div className="section-container">
          <img src={HeaderLogo} alt=".PNG" />
          <TypewriterComponent
          options={{
            strings: ["Recommendations Made Easy", "For Your Favorite Movies", "And Your Favorite TV Shows", "One Stop For All Your Needs!"],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
            wrapperClassName: "typewriter",
          }}
          />
        </div>
      </section>
      
      <section className="v-center" id="about-us">
          <img className="illustration" src={AboutUsIllustration} alt="" />
        <div className="section-container">
          <h1>About Us</h1>
          <p>
            A good watch is a recommendation system, that does more than just
            recommend movies. It helps you keep in track with the latest movies
            and TV series, as well as build your feed with appealing
            suggestions. If you are someone who loves movies, and often come
            across a dilemma on what to watch next, fret no more, for our
            recommendation system will do the job for you. With a system that
            provides suggestions based on what you watched recently.
          </p>
        </div>
      </section>

      <section className="v-center" id="services">
          <h1>Services</h1>
          <img className="illustration" src={ServicesIllustration} alt="" />
        <div className="section-container">
          <div className="service">
            <img src={AuthIllustration} alt="" />
            <div className="service-details">
              <h3>Authentication</h3>
              <p>
              Process that makes creation and maintenance of your personal GoodWatch account a breeze.</p>
            </div>
          </div>
          <div className="service">
            <img src={PlayTrailerIllustration} alt="" />
            <div className="service-details">
              <h3>Media Player</h3>
              <p>
              Play trailers for movies and series to help you decide your next Good watch.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={RecommendationIllustration} alt="" />
            <div className="service-details">
              <h3>Recommendations</h3>
              <p>
              Robust recommendations based on content, to provide you with a diverse pallete to choose from.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={WatchListIllustration} alt="" />
            <div className="service-details">
              <h3>My List</h3>
              <p>
              You can create a watch list of TV shows and movies by adding them to My List.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={HistoryIllustration} alt="" />
            <div className="service-details">
              <h3>Watch History</h3>
              <p>
              History to help you track your visits, in case you want to revisit the selections.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={ResponsiveIllustration} alt="" />
            <div className="service-details">
              <h3>Responsive</h3>
              <p>
              Multi device and cross-platflorm support, lets the site adapt to fit your devices' needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="v-center" id="team">
          <h1>Meet Our Team</h1>
          <img className="illustration" src={TeamIllustration} alt="" />
        <div className="section-container">
          <div className="team-member">
            <img src={DeveloperIllustration} alt="" />
            <div className="team-member-details">
            <img className="team-member-profile" src={TeamMember1} alt="" />
              <h2>Lakshit Bisht <small style={{opacity:0.6}}>(Team Leader, Development)</small></h2>
              <p>
              Proficient in languages C++, Python and Java, with in depth knowledge in fields like Database Management Systems and Operating Systems, Profound understanding of Machine Learning and web Development. Skilled in Competitive Programming, with astound knowledge of Data Structure and Algorithms.
              </p>
              <span>Contact : <a href="mailto:bishtlakshit555@gmail.com">bishtlakshit555@gmail.com</a></span>
            </div>
          </div>
          <div className="team-member">
            <img src={MachineLearningIllustration} alt="" />
            <div className="team-member-details">
            <img className="team-member-profile" src={TeamMember2} alt="" />
              <h2>Rahul Banerjee <small style={{opacity:0.6}}>(Machine Learning)</small></h2>
              <p>
              Understanding in the fields of Machine Learning and Deep Learning.
              Experienced in languages like C++, Java and Python.
              Intermediate to advanced  knowledge in building models and recommendation systems.
              Also familiar with web development.
              </p>
              <span>Contact : <a href="mailto:banerjee132000@gmail.com">banerjee132000@gmail.com</a></span>
            </div>
          </div>
          <div className="team-member">
            <img src={DocumentIllustration} alt="" />
            <div className="team-member-details">
            <img className="team-member-profile" src={TeamMember3} alt="" />
              <h2>Shashwat Karnwal <small style={{opacity:0.6}}>(Research)</small></h2>
              <p>
              Beginner level knowledge in Machine Learning and Advanced Mathematics. Familiar with web designing using HTML and CSS. Intermediate level knowledge in languages like C++, Java, Python and Front end Development. Proficient in research and content creation.
              </p>
              <span>Contact : <a href="mailto:shashwatkarnwal@yahoo.com">shashwatkarnwal@yahoo.com</a></span>
            </div>
          </div>
        </div>
      </section>
      
      <section id="contact">
        <div className="section-container v-center">
          <Button
            className="contact-button"
            variant="contained"
            startIcon={
              <MailOutlineIcon style={{ fontSize: "inherit !important" }} />
            }
            onClick={() => navigate("/about/contact")}
          >
            Contact Us
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
