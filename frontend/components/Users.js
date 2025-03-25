import React, { useState, useEffect } from 'react';
import axios from '../axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    axios.get('/users').then(response => setUsers(response.data));
  }, []);

  const handleAddUser = () => {
    const userData = { name, email, pass };
    axios.post('/users', userData).then(response => {
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
      setPass('');
    });
  };

  const handleDeleteUser = (id) => {
    axios.delete(`/users/${id}`).then(() => {
      setUsers(users.filter(user => user._id !== id));
    });
  };

  const handleUpdateUser = (id) => {
    const updatedData = { name, email, pass };
    axios.put(`/users/${id}`, updatedData).then(response => {
      const updatedUsers = users.map(user =>
        user._id === id ? response.data : user
      );
      setUsers(updatedUsers);
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleUpdateUser(user._id)}>Update</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Add/Update User</h2>
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
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default Users;
