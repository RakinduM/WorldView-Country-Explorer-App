import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GlobeIcon, MenuIcon, XIcon, LogOutIcon } from 'lucide-react';

export const Header = () => {
  const profileImage = 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1746379839~exp=1746383439~hmac=fc17cd92b08890b30bed2c8aaa975d35baf364a858933c23f2408fae5bc62320&w=1380';
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <GlobeIcon size={24} />
          <span>WorldView</span>
        </Link>
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/countries" className="hover:text-blue-400 transition-colors">
            Countries
          </Link>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">

                    <img
                      src={profileImage}
                      alt="Default Profile"
                      className="w-full h-full object-cover"
                    />

                </div>
                <span>{user?.name}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 hover:text-blue-400"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 hover:text-red-400"
                  >
                    <LogOutIcon size={16} className="inline-block mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link to="/login" className="hover:text-blue-400 transition-colors">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link
              to="/"
              className="hover:text-blue-400 transition-colors py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/countries"
              className="hover:text-blue-400 transition-colors py-2"
              onClick={toggleMenu}
            >
              Countries
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="hover:text-blue-400 transition-colors py-2 flex items-center space-x-1"
                  onClick={toggleMenu}
                >
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="hover:text-blue-400 transition-colors py-2"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};