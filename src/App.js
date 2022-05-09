import "./App.css";
import Loading from "./components/loading/Loading";
import Login from "./pages/login/Login";
import Signup from "./pages/singnup/Signup";
import ForgotPass from "./pages/forgotpass/ForgotPass";
import HomeScreen from "./pages/homescreen/HomeScreen";
import Profile from "./pages/profile/Profile";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import MyList from "./pages/mylist/MyList";
import History from "./pages/history/History";
import SearchResult from "./pages/searchresult/SearchResult";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser, getUserDataDB } from "./features/userSlice";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const currUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        dispatch(getUserDataDB(user.email));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <AnimatePresence>
      <div className="app">
        {loading ? (
          <Loading />
        ) : (
          <Router>
            <Routes>
              {!currUser ? (
                <>
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<Signup />} />
                  <Route
                    exact
                    path="/forgot-password"
                    element={<ForgotPass />}
                  />
                </>
              ) : (
                <>
                  <Route exact path="/browse" element={<HomeScreen />} />
                  <Route exact path="/movies" element={<Movies />} />
                  <Route exact path="/series" element={<Series />} />
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/mylist" element={<MyList />} />
                  <Route exact path="/history" element={<History />} />
                  <Route path="/search" element={<SearchResult />} />
                </>
              )}
              ;
              <Route
                path="*"
                element={
                  <Navigate to={currUser ? "/browse" : "/login"} replace />
                }
              />
            </Routes>
          </Router>
        )}
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </AnimatePresence>
  );
}

export default App;
