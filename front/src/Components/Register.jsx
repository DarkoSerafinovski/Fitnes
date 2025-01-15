import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "vezbac", // Defaultna uloga mora biti mala slova
  });
  const [error, setError] = useState(""); // Stanje za greške
  const [successMessage, setSuccessMessage] = useState(""); // Stanje za uspeh

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Provera da li se šifre poklapaju
    if (formData.password !== formData.confirmPassword) {
      setError("Šifre se ne poklapaju!");
      return;
    }

    // Resetovanje greške ako je sve u redu
    setError("");

    // Slanje podataka na backend
    axios
      .post("http://localhost:8000/api/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role.toLowerCase(), // Konverzija uloge u mala slova
      })
      .then((response) => {
        if (response.data.success) {
            navigate("/"); 
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.message || "Došlo je do greške. Pokušajte ponovo.");
        } else {
          setError("Došlo je do greške. Pokušajte ponovo.");
        }
      });
  };

  return (
    <div className="register-container">
      <h1>Kreiraj Nalog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Korisničko ime"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Šifra"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Ponovite šifru"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="trener">Trener</option>
          <option value="vezbac">Vežbač</option>
        </select>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="register-btn">
          Registruj se
        </button>
      </form>
      <div className="switch-to-login">
        Već imate nalog?{" "}
        <a onClick={() => navigate("/")} href="#">
          Prijavite se ovde
        </a>
      </div>
    </div>
  );
};

export default Register;
