import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SearchIcon, GlobeIcon, UserIcon, BookmarkIcon, MenuIcon, XIcon } from 'lucide-react';
export const Header = () => {
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <GlobeIcon size={24} />
          <span>WorldExplorer</span>
        </Link>
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200 transition-colors">
            Home
          </Link>
          <Link to="/countries" className="hover:text-blue-200 transition-colors">
            Countries
          </Link>
          {isAuthenticated ? <>
              <Link to="/profile" className="hover:text-blue-200 transition-colors flex items-center space-x-1">
                <UserIcon size={18} />
                <span>{user?.name}</span>
              </Link>
              <button onClick={() => {
            logout();
            navigate('/');
          }} className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
                Logout
              </button>
            </> : <div className="flex space-x-3">
              <Link to="/login" className="hover:text-blue-200 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
                Sign Up
              </Link>
            </div>}
        </nav>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-blue-700 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link to="/" className="hover:text-blue-200 transition-colors py-2" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/countries" className="hover:text-blue-200 transition-colors py-2" onClick={toggleMenu}>
              Countries
            </Link>
            {isAuthenticated ? <>
                <Link to="/profile" className="hover:text-blue-200 transition-colors py-2 flex items-center space-x-1" onClick={toggleMenu}>
                  <UserIcon size={18} />
                  <span>{user?.name}</span>
                </Link>
                <button onClick={() => {
            logout();
            navigate('/');
            toggleMenu();
          }} className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
                  Logout
                </button>
              </> : <div className="flex flex-col space-y-2">
                <Link to="/login" className="hover:text-blue-200 transition-colors py-2" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors text-center" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </div>}
          </div>
        </div>}
    </header>;
};