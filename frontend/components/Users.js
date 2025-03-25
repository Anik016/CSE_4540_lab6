import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: token,
        },
      })
        .then(response => setUsers(response.data))
        .catch(error => console.log('Error fetching users:', error));
    }
  }, [token]);

  const handleAddUser = () => {
    const userData = { name, email, pass };
    axios.post('http://localhost:3000/register', userData)
      .then(response => {
        console.log(response.data);
        setName('');
        setEmail('');
        setPass('');
      })
      .catch(err => console.error('Error registering user:', err));
  };

  const handleLogin = () => {
    const loginData = { email, pass };
    axios.post('http://localhost:3000/login', loginData)
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);  // Save token to localStorage
        setToken(token);
      })
      .catch(err => console.error('Login failed:', err));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div>
      {token ? (
        <>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>

          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button onClick={handleAddUser}>Register</button>
        </>
      )}
    </div>
  );
};

export default Users;
