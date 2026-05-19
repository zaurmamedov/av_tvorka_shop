import { useState } from "react";
import { authService } from "../services/auth.service";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    const { error } = await authService.signUp(email, password, fullName, phone);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created");
  };

  return (
    <div>
      <h1>Register</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        placeholder="Ваше імʼя"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        type="tel"
        placeholder="+380"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};