import './App.css';
import Loading from './components/loading/Loading';
import HomeScreen from './pages/homescreen/HomeScreen';
import Login from './pages/login/Login';
import Signup from './pages/singnup/Signup';
import ForgotPass from './pages/forgotpass/ForgotPass';
import {auth} from './firebase';
import {onAuthStateChanged} from 'firebase/auth';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout, selectUser} from './features/userSlice';

function App() {

  const [loading, setLoading] = useState(true);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=> {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if(user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }));
        } else {
        dispatch(logout());
			}
      setLoading(false);
		});
		
		return unsubscribe;
	}, [dispatch]);

  return (
    <div className="app">
      {loading ? <Loading /> : 
      (<Router>
        <Routes>
          {!user ?(
              <Route exact path="/login" element={<Login />} />
          ):(
            <Route exact path="/browse" element={(<HomeScreen />)} />
          )};
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/forgot-password" element={<ForgotPass />} />
            <Route path='*' element={<Navigate to={user?"/browse" : "/login"} replace/>} />
        </Routes>
      </Router>
      )}
      <ToastContainer position="bottom-right" theme="dark"/>
    </div>
  );
}

export default App;
