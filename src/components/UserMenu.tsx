import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './UserMenu.css';

interface UserMenuProps {
  onOpenAuth: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onOpenAuth }) => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return <div className="user-menu-loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <button className="sign-in-btn" onClick={onOpenAuth}>
        Sign In
      </button>
    );
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-menu-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="user-avatar">
          {user?.displayName?.charAt(0).toUpperCase()}
        </span>
        <span className="user-name">{user?.displayName}</span>
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <span className="user-email">{user?.email}</span>
          </div>
          <div className="user-menu-divider" />
          <button className="user-menu-item" onClick={() => { setIsOpen(false); }}>
            📊 My Statistics
          </button>
          <button className="user-menu-item" onClick={() => { setIsOpen(false); }}>
            📜 History
          </button>
          <div className="user-menu-divider" />
          <button className="user-menu-item logout" onClick={logout}>
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
