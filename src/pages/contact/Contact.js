import "./Contact.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

function Contact() {
  const user = useSelector(selectUser);
  const form = useRef();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    if (form.current.message.value === "") {
      setError("Message Cannot be Empty");
      setLoading(false);
      return;
    }
    toast
      .promise(
        emailjs
          .sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            form.current,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
          )
          .then(() => setLoading(false)),
        {
          pending: "Sending Message...",
          success: "Message sent Successfully!",
          error: "An Error Occurred!",
        }
      )
      .catch(() => {
        setLoading(false);
        setError("Failed to send Message!");
      });
    form.current.reset();
  };

  return (
    <div className="contact">
      <Navbar />
      <div className="emailForm">
        <motion.form
          initial={{ opacity: 0, y: "5rem" }}
          exit={{ opacity: 0, y: "5rem" }}
          animate={{ opacity: 1, y: 0 }}
          layout
          ref={form}
        >
          <div style={{ textAlign: "center" }}>
            <h2>Contact Us</h2>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="input-div">
            <label>Name</label>
            <input
              name="name"
              type="text"
              required
              defaultValue={user.displayName}
              placeholder="Enter Your Name"
              autoComplete="on"
            />
          </div>
          <div className="input-div">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              required
              defaultValue={user.email}
              placeholder="Enter Your Email"
              autoComplete="on"
            />
          </div>
          <div className="input-div">
            <label>Message</label>
            <textarea
              name="message"
              rows="10"
              cols="30"
              placeholder="Write in this Area."
              required
            ></textarea>
          </div>
          <button onClick={sendEmail} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
          <button onClick={() => navigate(-1)} disabled={loading}>
            Back
          </button>
        </motion.form>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
