import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CountriesPage } from './pages/CountriesPage';
import { CountryDetailPage } from './pages/CountryDetailPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { Toaster } from 'sonner';
export function App() {
  return <BrowserRouter>
      <AuthProvider>
        <BookmarkProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/countries" element={<CountriesPage />} />
                <Route path="/countries/:countryCode" element={<CountryDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </BookmarkProvider>
      </AuthProvider>
    </BrowserRouter>;
}