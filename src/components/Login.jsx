import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password
      });
      setMessage('Login successful! Welcome, ' + response.data.name);
    } catch (error) {
      setMessage(error.response?.data || 'Login failed!');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto', textAlign: 'left' }}>
      <h3>User Login</h3>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label><br/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '6px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '6px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '10px', color: 'blue' }}>{message}</p>
    </div>
  );
}

export default Login;