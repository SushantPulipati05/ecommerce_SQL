import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userFromStorage = JSON.parse(localStorage.getItem('user'));
      if (!userFromStorage || !userFromStorage.ID) return;

      try {
        const res = await axios.get('http://localhost:3000/auth/get-user', {
          params: {
            userId: userFromStorage.ID,
          },
        });
        console.log("Fetched user:", res.data);
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-200">
      <Navbar />
      <div className='flex-grow px-10 py-6'>
        <h1 className="text-3xl font-bold text-center mt-10">Profile Page</h1>
        {user ? (
          <div className="mt-6 text-center">
            <p><strong>Name:</strong> {user.Name}</p>
            <p><strong>Email:</strong> {user.Email}</p>
            <p><strong>{user.Role}</strong></p>
          </div>
        ) : (
          <p className="text-center mt-4">Loading user...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
