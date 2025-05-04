import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header';
import { vi } from 'vitest';
import { useAuth } from '../../contexts/AuthContext';

// Mock the `useAuth` hook
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('Header Component', () => {
  const mockLogout = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useAuth as vi.Mock).mockReturnValue({
      user: { name: 'John Doe', profileImage: 'https://example.com/profile.jpg' },
      isAuthenticated: true,
      logout: mockLogout,
    });
  });

  test('renders the header with navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('WorldView')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Countries')).toBeInTheDocument();
  });

  test('renders the profile image and dropdown menu for authenticated users', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const profileImage = screen.getByAltText('Default Profile');
    expect(profileImage).toBeInTheDocument();

    // Open the dropdown menu
    fireEvent.click(profileImage);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('calls logout and navigates to home when "Sign Out" is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Open the dropdown menu
    const profileImage = screen.getByAltText('Default Profile');
    fireEvent.click(profileImage);

    // Click "Sign Out"
    const signOutButton = screen.getByText('Sign Out');
    fireEvent.click(signOutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test('renders login and signup links for unauthenticated users', () => {
    (useAuth as vi.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: mockLogout,
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });


});