import {useState, useEffect, useRef} from "react";
import "./ForgotPass.css";
import {auth, analytics} from '../../firebase';
import { logEvent } from "firebase/analytics";
import { sendPasswordResetEmail} from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {motion} from 'framer-motion';


function ForgotPass() {
	const emailRef = useRef();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	
	
	useEffect(()=> {
		if (navigate.state && navigate.state.email) {
			setEmail(navigate.state.email);
		}
	}, [navigate]);
	
	useEffect(()=> {
		if (error) {
			setTimeout(()=> {
				setError(null);
			}, 10000);
		}
	}, [error]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		
		toast.promise(sendPasswordResetEmail(auth, emailRef.current.value).then(()=> {
			setLoading(false);
			toast.info("Check your inbox for further instructions");
			logEvent(analytics, 'password_reset');
      navigate("/login");
		}),
    {
      pending: 'Loading...',
      success: 'Password Reset email sent!',
      error: 'An error occurred',
    }).catch((error) => {setError(error.message); setLoading(false)});
	}
		
  return (
    <div className="forgotpass">
    	<motion.form initial={{opacity: 0, y: '5rem'}} exit={{opacity: 0, y: '5rem'}} animate={{opacity: 1, y: 0}} layout onSubmit={handleSubmit}>
			<h3>Forgot Password</h3>
			{error && <p className="error">{error}</p>}
			<div className="input">
				<label>Email Address</label>
				<input type="email" required value={email?email:undefined} ref={emailRef} placeholder="johndoe@gmail.com" />
			</div>
			<button style={{backgroundColor: '#3cb19f'}} disabled={loading}>
				{loading ?'Sending Mail...' : 'Reset Password'}
			</button>
			<div className="login-link">
				<Link to="/login">Login</Link>
			</div>
		</motion.form>
    </div>
  )
}
export default ForgotPass;