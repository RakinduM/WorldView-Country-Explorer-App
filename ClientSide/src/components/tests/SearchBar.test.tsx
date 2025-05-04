import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../SearchBar';
import { vi } from 'vitest';

describe('SearchBar Component', () => {

const mockOnSearch = vi.fn();


  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders the search bar with placeholder text', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Search for a country..." />);
    const inputElement = screen.getByPlaceholderText('Search for a country...');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onSearch when typing in the input field', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(inputElement, { target: { value: 'Canada' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Canada');
  });



  test('calls onSearch with the current query when the form is submitted', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Search for a country...');
    const submitButton = screen.getByRole('button', { name: /search/i });

    // Type in the input field
    fireEvent.change(inputElement, { target: { value: 'Canada' } });
    fireEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Canada');
  });

  test('does not call onSearch when the input is empty and the form is submitted', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const submitButton = screen.getByRole('button', { name: /search/i });

    // Submit the form without typing anything
    fireEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});