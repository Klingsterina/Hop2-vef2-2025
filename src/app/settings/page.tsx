'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import '../../Styles/settings.scss';

export default function SettingsPage() {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchUserProfile();
  },);

  const getToken = () => {
    return localStorage.getItem('token') || '';
  };

  const fetchUserProfile = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/profile-picture`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch user info');
      }

      if (data.url) {
        setAvatarUrl(data.url);
      }
      // If you also want the username, either:
      // a) have an endpoint returning user info in one place, or
      // b) store the username in localStorage from login, or
      // c) create a separate route /account/me
      // For now, let's assume we have the username in localStorage:
      const localUser = localStorage.getItem('user');
      if (localUser) {
        const userObj = JSON.parse(localUser);
        if (userObj.username) {
          setUsername(userObj.username);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      const newUrl = data?.data?.cloudinaryUrl || data?.data?.secure_url;
      if (newUrl) {
        setAvatarUrl(newUrl);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const handleUpdateUsername = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/update-username`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update username');
      }
      if (data.data?.username) {
        setUsername(data.data.username);
        // Optionally update localStorage user
        const localUser = localStorage.getItem('user');
        if (localUser) {
          const userObj = JSON.parse(localUser);
          userObj.username = data.data.username;
          localStorage.setItem('user', JSON.stringify(userObj));
        }
      }
      // Clear input
      setNewUsername('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="settings-page">
      {/* Avatar Container */}
      <div className="settings-avatar" onClick={handleAvatarClick}>
        {avatarUrl ? (
          <Image src={avatarUrl} alt="Profile Avatar" className="avatar-image" />
        ) : (
          <div className="avatar-placeholder" title="Default Avatar">
            <span role="img" aria-label="avatar emoji">
              👤
            </span>
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />

        <div className="avatar-overlay">
          <span className="edit-icon">✎</span>
        </div>
      </div>

      <div className="settings-field">
        <label>Username</label>
        <div className="field-row">
          <input type="text" value={username} readOnly />
          <button
            onClick={() => {
              const newName = prompt('Enter new username:', username) || '';
              if (newName.trim()) {
                setNewUsername(newName);
                handleUpdateUsername();
              }
            }}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="settings-field">
        <label>Password</label>
        <div className="field-row">
          <input type="password" value="************" readOnly />
          <button
            onClick={() => {
              const oldPass = prompt('Enter your current password:', '');
              const newPass = prompt('Enter your new password:', '');
              if (oldPass && newPass) {
                // We can do handleUpdatePassword(...) here
                handleUpdatePassword(oldPass, newPass);
              }
            }}
          >
            Edit
          </button>
        </div>
      </div>

      <button onClick={handleSignOut} className="signout-button">
        Sign out
      </button>
    </div>
  );
}

async function handleUpdatePassword(currentPassword: string, newPassword: string) {
  try {
    const token = localStorage.getItem('token') || '';
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/update-password`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update password');
    }
    alert('Password updated successfully!');
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert('An unknown error occurred');
    }
  }
}