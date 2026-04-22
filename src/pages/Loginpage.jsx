import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/Authslice";
import "../css/Loginpage.css";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required");
      setLoading(false);
      return;
    }

    const payload = {
      username: form.username.trim(),
      password: form.password.trim(),
      expiresInMins: 30,
    };

    console.log("payload", payload);

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("response", data);

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }
      const userRes = await fetch(`https://dummyjson.com/users/${data.id}`);
      const fullUser = await userRes.json();
      const mergedUser = {
        ...fullUser,
        accessToken: data.accessToken,
      };
      console.log("mergeduser", mergedUser);
      dispatch(loginSuccess(mergedUser));
      console.log("helllo");
      Swal.fire({
        title: "Login Successfull",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/products");
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Admin Panel</h1>
          <p className="login-subtitle">Sign in to your account</p>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
