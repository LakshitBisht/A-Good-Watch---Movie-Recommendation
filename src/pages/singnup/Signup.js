import {useState, useEffect, useRef} from "react";
import "./Signup.css";
import {auth, provider, analytics} from '../../firebase';
import { logEvent } from "firebase/analytics";
import {createUserWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {motion} from 'framer-motion';

function Signup() {
	
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
	
	
	useEffect(()=> {
		if (error) {
			setTimeout(()=> {}, 10000);
		}
	}, [error]);
	

    const googleSignIn = (e) => {
		e.preventDefault();
		setLoading(true);
		signInWithPopup(auth, provider).then((result) => {
			setLoading(false);
			toast.success('Welcome!');
			logEvent(analytics,'logged_in');
			setTimeout(()=> {
				navigate("/browse");}, 2000);
		}).catch((error) => {setError(error.message); setLoading(false)});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(null);
		
		if(passwordRef.current.value !== confirmPasswordRef.current.value) {
			return setError('Passwords do not match');
		}

		setLoading(true);

			toast.promise(
				createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then(async () => {
      				await updateProfile(auth.currentUser, {
              			displayName: usernameRef.current.value,
              			photoURL: `https://avatars.dicebear.com/api/adventurer-neutral/${emailRef.current.value}.svg`,});
                logEvent(analytics, 'signed_up');
				setLoading(false);
            }),
			{
				pending: 'Creating Account...',
				success: 'Setting Up Account...',
				error: 'An error occurred',
			}).catch((error) => {setError(error.message); setLoading(false)});
			setTimeout(()=> {
				if(error)
				{
					navigate("/browse");
					setError(null);
				}
			}, 2000);
	}
		
  return (
    <div className="signup">
    	<motion.form initial={{opacity: 0, y: '5rem'}} exit={{opacity: 0, y: '5rem'}} animate={{opacity: 1, y: 0}} layout onSubmit={handleSubmit}>
			<h3>Sign Up</h3>
			{error && <p className="error">{error}</p>}
			<div className="input">
				<label>Username</label>
				<input type="text" required  ref={usernameRef} placeholder="John Doe" />
			</div>
			<div className="input">
				<label>Email Address</label>
				<input type="email" required  ref={emailRef} placeholder="johndoe@gmail.com" />
			</div>
			<div className="input">
				<label>Password</label>
				<input type="password" ref={passwordRef}  placeholder="••••••••" />
			</div>
			<div className="input">
				<label>Confirm Password</label>
				<input type="password" ref={confirmPasswordRef} placeholder="••••••••" />
			</div>
			<button style={{backgroundColor: '#ec215f'}} disabled={loading}>{loading ? 'Signing up...' : 'Create Account'}</button>
			<button className="google" disabled={loading} onClick={googleSignIn}>Sign In with Google</button>
            <p>
                <span>{'Already have an account?'}{' '}</span>
                <b style={{color: '#3cb19f'}}>
                    <Link to="/login" >Login Instead.</Link>
                </b>
            </p>
		</motion.form>
    </div>
  )
}
export default Signup;