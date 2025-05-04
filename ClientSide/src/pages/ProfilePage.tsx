import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { UserIcon, MailIcon, LogOutIcon, TrashIcon } from 'lucide-react';

export const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { bookmarks, removeBookmark } = useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100 mb-8">Your Profile</h1>
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-6">
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-900 p-3 rounded-full mr-4">
                    <UserIcon size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-100">{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-900 p-3 rounded-full mr-4">
                    <MailIcon size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Address</p>
                    <p className="font-medium text-gray-100">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center text-red-400 hover:text-red-600 transition-colors"
                >
                  <LogOutIcon size={18} className="mr-2" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-6">
                Your Bookmarked Countries
              </h2>
              {bookmarks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    You haven't bookmarked any countries yet.
                  </p>
                  <Link
                    to="/countries"
                    className="text-blue-400 hover:text-blue-600 font-medium"
                  >
                    Explore countries to add bookmarks
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {bookmarks.map((bookmark) => (
                    <div
                      key={bookmark.alpha3Code}
                      className="border border-gray-700 rounded-lg overflow-hidden flex flex-col bg-gray-700"
                    >
                      <Link
                        to={`/countries/${bookmark.alpha3Code}`}
                        className="block h-32 overflow-hidden"
                      >
                        <img
                          src={bookmark.flag}
                          alt={`Flag of ${bookmark.name}`}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="p-4 flex justify-between items-center">
                        <Link
                          to={`/countries/${bookmark.alpha3Code}`}
                          className="font-medium text-gray-100 hover:text-blue-400"
                        >
                          {bookmark.name}
                        </Link>
                        <button
                          onClick={() => removeBookmark(bookmark.alpha3Code)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                          aria-label={`Remove ${bookmark.name} from bookmarks`}
                        >
                          <TrashIcon size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};