import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedBookmarks = sessionStorage.getItem('bookmarks');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setBookmarks([]);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('bookmarks');
  };

  const addBookmark = (treatment) => {
    setBookmarks((prevBookmarks) => {
      const isAlreadyBookmarked = prevBookmarks.some(bookmark => bookmark.id === treatment.id);
      if (!isAlreadyBookmarked) {
        const updatedBookmarks = [...prevBookmarks, treatment];
        sessionStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        return updatedBookmarks;
      }
      return prevBookmarks;
    });
  };

  const updateBookmark = (updatedTreatment) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.map(bookmark =>
        bookmark.id === updatedTreatment.id ? updatedTreatment : bookmark
      );
      sessionStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const deleteBookmark = (treatmentId) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.filter(bookmark => bookmark.id !== treatmentId);
      sessionStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, bookmarks, addBookmark, updateBookmark, deleteBookmark }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);