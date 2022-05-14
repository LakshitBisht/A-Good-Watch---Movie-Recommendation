import "./SideNav.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import ContactMailRoundedIcon from "@material-ui/icons/ContactMailRounded";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import { useState } from "react";

function SideNav() {
  const [hideSideNav, setHideSideNav] = useState(true);
  return (
    <>
      <div className={`side-nav-button-wrapper ${hideSideNav ? "" : "show"}`}>
        <Button
          className={`side-nav-button ${hideSideNav ? "" : "show"}`}
          variant="contained"
          onClick={() => setHideSideNav(!hideSideNav)}
        >
          <KeyboardArrowUpIcon
            className={`side-nav-icon ${hideSideNav ? "" : "show"}`}
            fontSize="large"
          />
        </Button>
      </div>
      <div className={`side-nav ${hideSideNav ? "hide" : "show"}`}>
        <ul>
          <a href="#about-header">
            <li className="about-home">
              <HomeRoundedIcon fontSize="large"/>
            </li>
          </a>
          <a href="#about-us">
            <li className="about-info">
              <InfoRoundedIcon fontSize="large"/>
            </li>
          </a>
          <a href="#services">
            <li className="about-services">
              <TuneRoundedIcon fontSize="large"/>
            </li>
          </a>
          <a href="#team">
            <li className="about-team">
              <GroupRoundedIcon fontSize="large"/>
            </li>
          </a>
          <a href="#contact">
            <li className="about-contact">
              <ContactMailRoundedIcon fontSize="large"/>
            </li>
          </a>
        </ul>
      </div>
    </>
  );
}

export default SideNav;
