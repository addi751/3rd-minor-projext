import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, removeUser } from '../../redux/slices/userSlice';

const UserManager = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      dispatch(addUser({ id: Date.now(), ...newUser }));
      setNewUser({ name: '', email: '' });
    }
  };

  const handleRemoveUser = (userId) => {
    dispatch(removeUser(userId));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Manager</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white py-1 px-3 rounded"
        >
          Add User
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">User List</h2>
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex justify-between items-center border-b py-2">
              <span>{user.name} - {user.email}</span>
              <button
                onClick={() => handleRemoveUser(user.id)}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserManager;
