'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useLayoutEffect } from 'react';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import '../../Styles/banner.scss';

type BannerProps = {
  isLoggedIn: boolean;
  username?: string;
  profilePicture?: string;
};

export default function Banner({ isLoggedIn, username, profilePicture }: BannerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  useLayoutEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
  }, [isDropdownOpen]);

  return (
    <div className="banner">
      {isLoggedIn ? (
        <div className="banner-user">
          <div className="banner-button" onClick={toggleDropdown} ref={buttonRef}>
            <span>{username}</span>
            <span className="banner-divider" />
            {profilePicture ? (
              <Image src={profilePicture} alt="Profile" className="banner-profile" />
            ) : (
              <span className="banner-icon">👤</span>
            )}
          </div>

          {isDropdownOpen && (
            <div className="banner-dropdown" style={{ width: dropdownWidth || 'auto' }}>
              <Link href="/settings">
                <span className="dropdown-item">
                  Settings <FiSettings />
                </span>
              </Link>
              <button onClick={handleSignOut} className="dropdown-item">
                Sign out <FiLogOut />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="banner-user">
          <div className="banner-button">
            <Link href="/register">Register</Link>
            <span className="banner-divider" />
            <Link href="/signin">Sign in</Link>
            <span className="banner-divider" />
            <span className="banner-icon">👤</span>
          </div>
        </div>
      )}
    </div>
  );
}