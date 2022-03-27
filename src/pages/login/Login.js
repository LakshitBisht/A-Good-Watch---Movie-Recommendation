import {useState, useEffect, useRef} from "react";
import "./Login.css";
import {auth, provider, analytics} from '../../firebase';
import { logEvent } from "firebase/analytics";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {motion} from 'framer-motion';


function Login() {
	const emailRef = useRef()
	const passwordRef = useRef()
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	
	useEffect(()=> {
		if (error) {
			setTimeout(()=> {
				setError(null);
			}, 10000);
		}
		return setError;
	}, [error]);
	
	const googleSignIn = (e) => {
		e.preventDefault();
		setLoading(true);
		signInWithPopup(auth, provider).then((result) => {
			setLoading(false);
			toast.success('Welcome Back!');
			logEvent(analytics,'logged_in');
			navigate("/");
		}).catch((error) => {setError(error.message); setLoading(false)});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		
		toast.promise(
			signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then(()=> {
				logEvent(analytics, 'logged_in');
				setLoading(false);
				navigate("/");
		}),
		{
			pending: 'Logging In...',
      		success: 'Welcome Back!',
			error: 'An error occurred',
		}).catch((error) => {setError(error.message);setLoading(false);});
	}
		
  return (
    <div className="login">
    	<motion.form initial={{opacity: 0, y: '5rem'}} exit={{opacity: 0, y: '5rem'}} animate={{opacity: 1, y: 0}} layout onSubmit={handleSubmit}>
			<h3>Login</h3>
			{error && <p className="error">{error}</p>}
			<div className="input">
				<label>Email Address</label>
				<input type="email" ref={emailRef} placeholder="johndoe@gmail.com" />
			</div>
			<div className="input">
				<label>Password</label>
				<input type="password" required ref={passwordRef} placeholder="••••••••" />
			</div>
			<button style={{backgroundColor: '#3cb19f'}} disabled={loading}>
				{loading ?'Logging In...' : 'Log In'}
			</button>
			<button className="google" disabled={loading} onClick={googleSignIn}>Sign In with Google</button>
			<div className="forgotPassword">
				<Link to="/forgot-password">Forgot Password?</Link>
			</div>
			<p>
				<span>{'New to AGoodWatch?'}{' '}</span>
				<b style={{color: '#ec215f'}}>
					<Link to="/signup">Sign Up Now.</Link>
				</b>
			</p>
		</motion.form>
    </div>
  )
}
export default Login;