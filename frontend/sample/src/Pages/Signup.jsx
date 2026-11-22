import { useState } from "react";
import "./Signup.css";
import api from "../api.js";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
     const response = await api.post("/user/signup", {
    email,
    password
});
            const data = response.data;

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
       navigate("/login");

    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>

      <div className="signup-card">

        <div className="signup-header">
          <div className="brand flex items-center justify-center gap-2 mb-8 ">

    <div className="brand-icon ">⌁</div>

    <span className="text-[40px] font-bold text-white">
        Trace<span className="brand-highlight">Pulse</span>
    </span>

</div>

          <h1 className="relative bottom-[15px]">Create account</h1>

          <p className="relative bottom-[15px]">Join us and get started today</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="input-group">
            <label>Full name</label>

            <div className="input-wrapper">
              <span className="input-icon">👤</span>

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span className="input-icon">🔒</span>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm password</label>

            <div className="input-wrapper">
              <span className="input-icon">🔐</span>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="signup-button">
            Create account
            <span>→</span>
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}
          <a href="/Login"> Login</a>
        </p>

      </div>
    </div>
  );
};

export default Signup;
