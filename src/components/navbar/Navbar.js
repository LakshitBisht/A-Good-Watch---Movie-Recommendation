import React, { useEffect, useRef, useState } from 'react';
import { ArrowDropDown} from '@material-ui/icons';
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import './Navbar.css';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';  
import {selectUser} from '../../features/userSlice';
import {auth} from '../../firebase/firebase';
import {signOut} from "firebase/auth";
import {toast} from 'react-toastify';
import LogoImg from '../../assests/images/logo.png';


function Navbar({searchNavigate=true, searchQueryUrl='', setSearchQueryUrl=undefined}) {

    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(selectUser);
    const [navClass,setNavClass] = useState('nav');
    const [avatarImg, setAvatarImg] = useState('');
    const [searchActive, setSearchActive] = useState(location?.state?.searchActive || !searchNavigate);
    const [searchQuery, setSearchQuery] = useState(searchQueryUrl);

    const searchQueryRef = useRef();

    useEffect(()=>{
        if(user){
            setAvatarImg(user.photoURL);
        }
        return ()=>{
            setAvatarImg('');
        }
    },[user]);

    useEffect(()=>{
        if(searchNavigate && searchQuery !== ''){
            navigate(`/search?q=${searchQuery}`);
        }
        else{
        if(!searchNavigate && searchQuery === ''){
            navigate('/browse', {state: {searchActive: true}});
        }
    }
    },[navigate, searchNavigate, searchQuery]);


    useEffect(()=>{
        searchActive && searchQueryRef.current.focus();
    },[searchActive]);


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

    const handleProfile = (e) => {
        e.preventDefault();
        navigate("/profile");
    };

    const handleSearchQueryChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        if(e.target.value !== ''){
        setSearchQueryUrl && setSearchQueryUrl({q:e.target.value}, { replace: true });
        }
    }

  return (
    <div className={`${navClass}`}>
        {avatarImg !== "" &&
        <div className='nav-items'>

            <div className="nav-left">
                <img className='logo' src={LogoImg} alt="logo.png" />
                <NavLink to="/browse">Home</NavLink>
                <NavLink to="/movies" >Movies</NavLink>
                <NavLink to="/series" >Series</NavLink>
                <NavLink to="/mylist" >My List</NavLink>
            </div>

            <div className="nav-right">


            <div className={`app__search mobile ${(searchActive) ? "open" : ""}`} onClick={()=>setSearchActive(true)}>
					<SearchRoundedIcon style={{ fontSize: 20 }} className="app__searchIcon" onClick={()=>setSearchActive(true)} />
					<input type="search" ref={searchQueryRef} value={searchQuery} onBlur={() => setSearchActive(false)} onChange={handleSearchQueryChange} placeholder="Search..." />
			</div>

                <div className="nav-profile">
                <img className='avatar' src={avatarImg} alt="avatar.png" />
                    <ArrowDropDown className="nav-icon" />
                    <div className="options">
                        <span onClick={handleProfile}>Profile</span>
                        <span onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            </div>  
        </div>
    }
    </div>
  )
}

export default Navbar