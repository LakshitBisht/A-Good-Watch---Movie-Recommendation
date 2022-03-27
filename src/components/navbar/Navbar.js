import React, { useEffect, useState } from 'react';
import { ArrowDropDown, Notifications } from '@material-ui/icons';
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import './Navbar.css';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';  
import {selectUser} from '../../features/userSlice';
import {auth, analytics} from '../../firebase';
import { logEvent } from "firebase/analytics";
import {signOut} from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

function Navbar() {

    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [navClass,setNavClass] = useState('nav');
    const [avatarImg, setAvatarImg] = useState('');

    useEffect(()=>{
        if(user){
            setAvatarImg(user.photoURL);
        }
    },[user]);

    const navTransition = () => {
        if(window.scrollY > 50){
            setNavClass('nav nav-black');
        }
        else{
            setNavClass('nav');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', navTransition);
        return () => {
            window.removeEventListener('scroll', navTransition);
        }
    }, []);


    const handleLogout = (e) => {
        e.preventDefault();
        const toastId = toast.loading('Logging Out...');
        setTimeout(()=>{
        toast.promise(
            signOut(auth).then(()=>{
                logEvent(analytics, 'logged_out');
                toast.dismiss(toastId);
                navigate("/login");
            }),
            {
                pending: 'Logging Out...',
                success: "We'll be waiting for your return!",
                error: 'An error occurred',
            }).catch((error) => {console.log(error.message);});
            },2000);
    };


  return (
    <div className={`${navClass}`}>
        <div className='nav-items'>

            <div className="nav-left">
                <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="logo.png" />
                <NavLink to="/browse" className={
                    ({ isActive }) =>
                        isActive ? "active" : undefined
                }>
                    <span>Home</span>
                </NavLink>
                <NavLink to="/movies" className={
                    ({ isActive }) =>
                        isActive ? "active" : undefined
                }>
                    <span className="navbarmainLinks">Movies</span>
                </NavLink>
                <NavLink to="/series" className={
                    ({ isActive }) =>
                        isActive ? "active" : undefined
                }>
                    <span className="navbarmainLinks">Series</span>
                </NavLink>
                <NavLink to="/mylist" className={
                    ({ isActive }) =>
                        isActive ? "active" : undefined
                }>
                <span>My List</span>
                </NavLink>
            </div>

            <div className="nav-right">
                <SearchRoundedIcon className="nav-icon" />
                <Notifications className="nav-icon" />
                <img className='avatar' src={avatarImg} alt="avatar.png" />
                <div className="nav-profile">
                    <ArrowDropDown className="nav-icon" />
                    <div className="options">
                        <span>Settings</span>
                        <span onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default Navbar