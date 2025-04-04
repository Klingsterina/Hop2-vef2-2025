'use client';

import { useState } from 'react';
import '../../Styles/settings.scss';

export default function SettingsPage() {
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('************');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="settings-page">
      <div className="settings-avatar">
        <div className="face">👤</div>
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
