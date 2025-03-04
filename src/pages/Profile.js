import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { updateProfile } from '../api';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({ username: '', email: '' });

  useEffect(() => {
    if (user) {
      setUserData({ username: user.username, email: user.email });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(userData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="form-container">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userData.username}
          placeholder="Name"
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          required
        />
        <input
          type="email"
          value={userData.email}
          placeholder="Email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
