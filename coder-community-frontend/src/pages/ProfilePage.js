import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/profiles/');
        setProfile(response.data[0]); // Assuming the first profile is the logged-in user
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <img src={profile.image} alt="Profile" />
      <p>First Name: {profile.first_name}</p>
      <p>Last Name: {profile.last_name}</p>
      <p>Country: {profile.country}</p>
      <p>Coding Skills: {profile.coding_skills}</p>
    </div>
  );
};

export default ProfilePage;