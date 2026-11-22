import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api.js";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/user/login", {
            email,
            password
        });

        console.log("Status:", response.status);
        console.log("Response:", response.data);

        toast.success("Login successful! Welcome back 🎉");

        setTimeout(() => {
            navigate("/Home");
        }, 3000);

    } catch (error) {
        console.error("LOGIN ERROR:", error.response?.data || error);

        toast.error(
            error.response?.data?.message || "Login failed"
        );
    }
};

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
         <div className="brand flex items-center justify-center gap-2 mb-8 ">

    <div className="brand-icon ">⌁</div>

    <span className="text-[26px] sm:text-[32px] md:text-[40px] font-bold text-white">
        Trace<span className="brand-highlight">Pulse</span>
    </span>

</div>

          <h1 className="relative bottom-[px]">Welcome back</h1>

          <p> Login to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email address</label>

            <div className="input-wrapper">
              <span className="input-icon">✉</span>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span className="input-icon">🔒</span>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            Login →
          </button>

        </form>
          <ToastContainer
        position="top-center"
        autoClose={2500}
        theme="colored"
        closeOnClick
        pauseOnHover
      />

        <p className="signup-text">
  Don't have an account?{" "}
  <Link to="/signup">Create account</Link>
</p>


      </div>
    </div>
  );
};

export default Login;
