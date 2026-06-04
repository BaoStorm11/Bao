import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "userName": userName, "password": password,
            "firstName": firstName, "lastName": lastName, "email": email
        }),
    });
    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        gohome();
    } else {
        alert("The user already exists");
    }
  };

  return (
    <div className="register_container">
      <form onSubmit={register}>
        <h2>Sign Up</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required />
        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Register;
