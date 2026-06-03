import React, { useState } from "react";
import "./Register.css"; // Đảm bảo bạn có file CSS tương ứng hoặc bổ sung style sau

const Register = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Đoạn code xử lý gọi API đăng ký tài khoản tới Django Backend
        const registerUrl = window.location.origin + "/djangoapp/register";
        
        try {
            const res = await fetch(registerUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userName": username,
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password
                }),
            });

            const json = await res.json();
            if (json.status === "Authenticated") {
                sessionStorage.setItem("username", json.userName);
                window.location.href = window.location.origin;
            } else if (json.error) {
                alert(json.error);
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            placeholder="Enter your first name"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            placeholder="Enter your last name"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a password"
                        />
                    </div>

                    <button type="submit" className="register-btn">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
