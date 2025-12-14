import React, { useState } from "react";
import "../../styles/Signup.css";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone_no: "",
    password: "",
    image: null,
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("phone_no", form.phone_no);
    formData.append("password", form.password);
    formData.append("image", form.image);

    const res = await axios.post(
      "http://localhost:5000/user/signup",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.message === "success") {
      // store token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.result));

      // redirect to home
      navigate("/");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-logo">🍬 Sweet Shop</h1>
        <p className="signup-subtitle">Create your account</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone_no"
              placeholder="Enter phone number"
              value={form.phone_no}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?
          <Link to={`/login`}><span className="login-link"> Login</span></Link>
        </p>
      </div>
    </div>
  );
}
