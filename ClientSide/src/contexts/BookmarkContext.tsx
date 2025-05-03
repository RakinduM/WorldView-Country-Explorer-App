import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
type Country = {
  alpha3Code: string;
  name: string;
  flag: string;
};
type BookmarkContextType = {
  bookmarks: Country[];
  addBookmark: (country: Country) => void;
  removeBookmark: (countryCode: string) => void;
  isBookmarked: (countryCode: string) => boolean;
};
const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);
export const BookmarkProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [bookmarks, setBookmarks] = useState<Country[]>([]);
  const {
    user
  } = useAuth();
  // Load bookmarks from localStorage when user changes
  useEffect(() => {
    if (user) {
      const userBookmarks = localStorage.getItem(`bookmarks-${user.id}`);
      if (userBookmarks) {
        setBookmarks(JSON.parse(userBookmarks));
      } else {
        setBookmarks([]);
      }
    } else {
      setBookmarks([]);
    }
  }, [user]);
  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`bookmarks-${user.id}`, JSON.stringify(bookmarks));
    }
  }, [bookmarks, user]);
  const addBookmark = (country: Country) => {
    if (!user) {
      toast.error('Please login to bookmark countries');
      return;
    }
    if (!isBookmarked(country.alpha3Code)) {
      setBookmarks([...bookmarks, country]);
      toast.success(`Added ${country.name} to bookmarks`);
    }
  };
  const removeBookmark = (countryCode: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.alpha3Code !== countryCode));
    toast.success('Removed from bookmarks');
  };
  const isBookmarked = (countryCode: string) => {
    return bookmarks.some(bookmark => bookmark.alpha3Code === countryCode);
  };
  return <BookmarkContext.Provider value={{
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  }}>
      {children}
    </BookmarkContext.Provider>;
};
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};