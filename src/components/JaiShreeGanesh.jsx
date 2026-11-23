import { useState } from 'react';
import axios from 'axios';

function JaiShreeGanesh() {
  const [fullName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Registering...'); // User ko status dikhane ke liye
    
    try {
      console.log("Sending registration request...", { fullName, email, password });
      
      const response = await axios.post('http://localhost:8080/api/users/register', {
        fullName,
        email,
        password
      });
      
      console.log("Response received:", response.data);
      
      // Safe check taaki crash na ho
      const userId = response.data?.id || 'Success';
      setMessage('Registration successful! User ID: ' + userId);
      
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = error.response?.data || error.message || 'Registration failed!';
      setMessage(typeof errorMsg === 'string' ? errorMsg : 'Registration failed!');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto', textAlign: 'left' }}>
      <h3>🙏 Jai Shree Ganesh - Register</h3>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '10px' }}>
          <label>Full Name: </label><br/>
          <input 
            type="text" 
            value={fullName} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ width: '100%', padding: '6px' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label><br/>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '6px' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label><br/>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '6px' }} 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: '10px', color: message.includes('successful') ? 'green' : 'red' }}>
        {message}
      </p>
    </div>
  );
}

export default JaiShreeGanesh;