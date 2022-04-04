import {useState, useEffect, useRef} from "react";
import "./Profile.css";
import {auth} from '../../firebase/firebase';
import {updateEmail, updatePassword, updateProfile, EmailAuthProvider, reauthenticateWithCredential, deleteUser} from "firebase/auth";
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {motion} from 'framer-motion';
import Navbar from "../../components/navbar/Navbar";

function Profile() {
	
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
    const [validatePassword, setValidatePassword] = useState(false);
    const [updatePro , setUpdatePro] = useState(false);
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [checkDelete, setCheckDelete] = useState(false);

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();
	
	
	useEffect(()=> {
		if (error) {
			setTimeout(()=> {}, 10000);
		}
	}, [error]);
	

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(null);
		
		if(newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
			return setError('Passwords do not match');
		}
		setLoading(true);

        toast.promise(
                updateEmail(auth.currentUser, emailRef.current.value).then(async () => {
      			updateProfile(auth.currentUser, {
              			displayName: usernameRef.current.value,
              			photoURL: `https://avatars.dicebear.com/api/adventurer-neutral/${emailRef.current.value}.svg`,});
                if(newPasswordRef.current.value !== '') {
                updatePassword(auth.currentUser, newPasswordRef.current.value);
                }
				setLoading(false);
                setUpdatePro(false);
                window.location.reload();
            }),
			{
				pending: 'Updating Profile...',
				success: 'Profile Updated!',
				error: 'An error occurred',
			}).catch((error) => {setError(error.message); setLoading(false)});
	}

    const validateCredentialsUpdate = (e) => {
        e.preventDefault();
        setValidatePassword(true);
        setCheckUpdate(true);
    }
    const validateCredentialsDelete = (e) => {
        e.preventDefault();
        setValidatePassword(true);
        setCheckDelete(true);
    }

    const enableUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        const credential = EmailAuthProvider.credential(emailRef.current.value, passwordRef.current.value);
        toast.promise(
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            setUpdatePro(true);
            setLoading(false);
            setValidatePassword(false);
        }),
        {
			pending: 'Validating Password...',
      		success: 'Password Validated!',
			error: 'Incorrect Password',
		}).catch(() => {
            setLoading(false);
            setValidatePassword(false);
            setCheckUpdate(false);
            document.getElementById("profileForm").reset();
        });
    }

    const cancelProfileChange = (e) => {
        e.preventDefault();
        setUpdatePro(false);
        setCheckUpdate(false);
        setCheckDelete(false);
        setValidatePassword(false);
        document.getElementById("profileForm").reset();
    }
    
    const deleteProfile = (e) => {
        e.preventDefault();
        setLoading(true);
        const credential = EmailAuthProvider.credential(emailRef.current.value, passwordRef.current.value);
        toast.promise(
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            deleteUser(auth.currentUser);
                setLoading(false);
        }),
        {
			pending: 'Deleting Profile...',
      		success: 'Profile Deleted!',
			error: 'Incorrect Password',
		}).catch(() => {
            setLoading(false);
            setValidatePassword(false);
            setCheckDelete(false);
        });
        
    }
    
  return (
      <>
      <Navbar />
    <div className="profile">
    	<motion.form id="profileForm" initial={{opacity: 0, y: '5rem'}} exit={{opacity: 0, y: '5rem'}} animate={{opacity: 1, y: 0}} layout onSubmit={updatePro? handleSubmit : !validatePassword? validateCredentialsUpdate : enableUpdate}>
			<h3>{updatePro? "Update Profile" : "Profile"}</h3>
			{error && <p className="error">{error}</p>}
			<div className="input">
				<label>Username</label>
				<input type="text" defaultValue={auth.currentUser.displayName} required ref={usernameRef} disabled={!updatePro}/>
			</div>
			<div className="input">
				<label>Email Address</label>
				<input type="email" required  ref={emailRef} defaultValue={auth.currentUser.email} disabled={!updatePro} />
			</div>
            {validatePassword && 
			<div className="input">
				<label>Password</label>
				<input type="password" required ref={passwordRef} placeholder="Enter Password to Continue." />
			</div>
            }
            {updatePro && 
			<div className="input">
				<label>New Password</label>
				<input type="password" ref={newPasswordRef} placeholder="Leave Blank to keep the Same." />
			</div>
            }
            {updatePro &&
			<div className="input">
				<label>Confirm New Password</label>
				<input type="password" ref={confirmNewPasswordRef} placeholder="Leave Blank to keep the Same." />
			</div>
            }
			{!checkDelete && <button style={{backgroundColor: '#ec215f'}} disabled={loading}>{updatePro ? "Confirm" : !validatePassword? "Update Profile" : "Continue"}</button>}
			{!checkUpdate && <button style={{backgroundColor: '#ec215f'}} disabled={loading} onClick={!validatePassword? validateCredentialsDelete : deleteProfile}>{!validatePassword? "Delete Profile" : "Continue"}</button>}
			{(updatePro || checkDelete) && <button style={{backgroundColor: '#ec215f'}} disabled={loading} onClick={cancelProfileChange}>Cancel</button>}
            <p>
                <Link to="/browse" replace>Back to HomeScreen.</Link>
            </p>
		</motion.form>
    </div>
    </>
  )
}
export default Profile;