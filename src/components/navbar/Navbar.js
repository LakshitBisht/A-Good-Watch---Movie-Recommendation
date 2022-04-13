import React, { useEffect, useRef, useState } from "react";
import { ArrowDropDown } from "@material-ui/icons";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import "./Navbar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import LogoImg from "../../assests/images/logo.png";

function Navbar({
  searchNavigate = true,
  searchQueryUrl = "",
  setSearchQueryUrl = undefined,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const [navClass, setNavClass] = useState("");
  const [avatarImg, setAvatarImg] = useState("");
  const [searchActive, setSearchActive] = useState(
    location?.state?.searchActive || !searchNavigate
  );
  const [searchQuery, setSearchQuery] = useState(searchQueryUrl);

  const searchQueryRef = useRef();

  useEffect(() => {
    if (user) {
      setAvatarImg(user.photoURL);
    }
    return () => {
      setAvatarImg("");
    };
  }, [user]);

  useEffect(() => {
    if (searchNavigate && searchQuery !== "") {
      navigate(`/search?q=${searchQuery}`);
    } else {
      if (!searchNavigate && searchQuery === "") {
        navigate("/browse", { state: { searchActive: true } });
      }
    }
  }, [navigate, searchNavigate, searchQuery]);

  useEffect(() => {
    searchActive && searchQueryRef.current.focus();
  }, [searchActive]);

  const navTransition = () => {
    if (window.scrollY > 50) {
      setNavClass("nav-black");
    } else {
      setNavClass("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navTransition);
    return () => {
      window.removeEventListener("scroll", navTransition);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging Out...");
    setTimeout(() => {
      toast
        .promise(
          signOut(auth).then(() => {
            toast.dismiss(toastId);
            navigate("/login");
          }),
          {
            pending: "Logging Out...",
            success: "We'll be waiting for your return!",
            error: "An error occurred",
          }
        )
        .catch((error) => {
          console.log(error.message);
        });
    }, 1500);
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleSearchQueryChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    if (e.target.value !== "") {
      setSearchQueryUrl &&
        setSearchQueryUrl({ q: e.target.value }, { replace: true });
    }
  };

  return (
    <div className={`navbar ${navClass}`}>
      <div className="nav-items">
        <ul className="nav-left">
          <li><img className="logo" src={LogoImg} alt="logo.png" /></li>
          <li><NavLink to="/browse">Home</NavLink></li>
          <li><NavLink to="/movies">Movies</NavLink></li>
          <li><NavLink to="/series">Series</NavLink></li>
          <li><NavLink to="/mylist">My List</NavLink></li>
        </ul>

        <ul className="nav-right">
          <li
            className={`nav-search mobile ${searchActive ? "open" : ""}`}
            onClick={() => setSearchActive(true)}
          >
            <SearchRoundedIcon
              style={{ fontSize: 20 }}
              className="nav-searchIcon"
              onClick={() => setSearchActive(true)}
            />
            <input
              type="search"
              ref={searchQueryRef}
              value={searchQuery}
              onBlur={() => setSearchActive(false)}
              onChange={handleSearchQueryChange}
              placeholder="Search..."
            />
          </li>
          {avatarImg !== "" && (
            <div className="nav-profile">
              <img className="avatar" src={avatarImg} alt="avatar.png" />
              <ArrowDropDown className="nav-icon" />
              <ul className="options">
                <li onClick={handleProfile}>Profile</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
