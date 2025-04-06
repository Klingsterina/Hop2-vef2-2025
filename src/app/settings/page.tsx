'use client';

import { useState, useRef, useEffect } from 'react';
import '../../Styles/settings.scss';

export default function SettingsPage() {
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('************');
  const [avatarUrl, setAvatarUrl] = useState(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch user info on mount (including the stored avatar URL, if any)
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Example GET request to your backend route that returns user info (with avatar URL).
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/user'); // Adapt to your route
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      const userData = await response.json();
      if (userData.avatarUrl) {
        setAvatarUrl(userData.avatarUrl);
      }
      if (userData.username) {
        setUsername(userData.username);
      }
      // ... set any other fields you want from userData
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
    // Trigger the hidden file input on avatar click
    fileInputRef.current?.click();
  };

  // Handle the file input change → upload to backend → get Cloudinary URL → set to state
  interface UploadResponse {
    avatarUrl: string;
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1) Create form data
      const formData = new FormData();
      formData.append('avatar', file);

      // 2) Upload to your backend, which in turn uploads to Cloudinary
      // Example using fetch:
      const uploadResponse = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });
      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const { avatarUrl: newCloudinaryUrl }: UploadResponse = await uploadResponse.json();

      // 3) Update local state with the new Cloudinary URL
      //setAvatarUrl(newCloudinaryUrl);

      // 4) Optionally, update user data on your backend with the new URL
      // (You might already handle this in the /api/upload-avatar endpoint,
      //  or you can make a separate request to /api/user to set the new avatar.)
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <div className="settings-page">
      {/* Avatar Container */}
      <div className="settings-avatar" onClick={handleAvatarClick}>
        {/* If avatarUrl exists, display an img. Otherwise display default "👤" emoji */}
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile Avatar" className="avatar-image" />
        ) : (
          <div className="avatar-placeholder" title="Default Avatar">
            <span role="img" aria-label="avatar emoji">
             👤
            </span>
          </div>
        )}

        {/* Hidden file input for uploading */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />

        {/* Hover overlay */}
        <div className="avatar-overlay">
          <span className="edit-icon">✎</span>
        </div>
      </div>

      <div className="settings-field">
        <label>user name</label>
        <div className="field-row">
          <input type="text" value={username} readOnly />
          <button>Edit</button>
        </div>
      </div>

      <div className="settings-field">
        <label>password</label>
        <div className="field-row">
          <input type="password" value={password} readOnly />
          <button>Edit</button>
        </div>
      </div>

      <button onClick={handleSignOut} className="signout-button">
        Sign out
      </button>
    </div>
  );
}
