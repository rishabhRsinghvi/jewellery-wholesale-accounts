// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [officeId, setOfficeId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('wholesaler');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth', { officeId, password, role });
      localStorage.setItem('token', response.data.token);
      setUser({ officeId, role });
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={officeId} onChange={(e) => setOfficeId(e.target.value)} placeholder="Office/Store ID" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="wholesaler">Wholesaler</option>
        <option value="retailer">Retailer</option>
      </select>
      <button type="submit">Login / Register</button>
    </form>
  );
};

export default Login;
