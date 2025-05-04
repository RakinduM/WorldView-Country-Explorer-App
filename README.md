# World Countries Search Website

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

## Description
This is a **frontend-focused web application** designed for users to search and explore information about countries around the globe. Using the **REST Countries API**, the app fetches and displays real-time data about countries, including details like population, capital, region, and more.

The project is built using **React** and styled with **TailwindCSS**, focusing on interactive design and smooth user experience.

---

## Features
- **Search Functionality**: Users can search for countries by name.
- **REST Countries API Integration**: Fetches country data dynamically.
- **Filter by Region**: Allows filtering countries by region (e.g., Asia, Europe).
- **Detail View**: Provides additional information about a selected country.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Animations**: Smooth transitions powered by Framer Motion.

---

## Prerequisites
Before starting, ensure that you have the following installed:
- **Node.js** (version 16 or newer recommended)
- **npm** (Node.js package manager)

---

## Tech Stack
- **Frontend**: React 19.0.0, TailwindCSS 4.1.5, React Router, Framer Motion
- **Backend**: Node JS, Express JS, MongoDB
- **API**: REST Countries API
- **Tooling**: Vite for development, ESLint for linting, TypeScript for type safety
- **Testing**: Jest and React Testing Library

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Scripts
- **`npm run dev`**: Starts the development server for the frontend.
- **`npm run build`**: Builds the project for production.
- **`npm run lint`**: Runs ESLint to lint the codebase.
- **`npm test`**: Runs the test suite.

---

## Folder Structure

```plaintext
project-folder
├── src
│   ├── components     # Reusable React components (e.g., SearchBar, CountryCard)
│   ├── pages          # Routes/pages for the app (e.g., Home, Country Details)
│   ├── hooks          # Custom React Hooks
│   ├── services       # API calls (REST Countries API)
│   ├── styles         # TailwindCSS configuration
│   ├── utils          # Utility functions and helpers
│   └── store          # Any global state management (if used)
├── public             # Static assets
├── tests              # Unit and integration tests
├── .env.example       # Example environment variables
├── package.json       # Project dependencies & scripts
└── README.md          # Project documentation
```

---

## REST Countries API Integration
This project fetches real-time data from the [REST Countries API](https://restcountries.com/). Here's an example of the API call structure used:

- **Base URL**: `https://restcountries.com/v3.1`
- Endpoints:
    - **Search by Name**: `/name/{name}`
    - **Get All Countries**: `/all`
    - **Filter by Region**: `/region/{region}`

### Example API Request
```javascript
import axios from 'axios';

const fetchCountries = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data;
};
```

---

## Features Breakdown
### **Search Functionality**
Users can type a country name into the search bar, and the app dynamically filters the displayed results in real-time.

### **Country Details**
Clicking on a country card navigates to a details page with more in-depth information, such as:
- Capital
- Population
- Official Languages
- Regional Bloc (if applicable)

### **Filter by Region**
Users can filter countries by regions like Africa, Americas, Asia, Europe, and Oceania.

### **Responsive Design**
The UI is optimized for all screen sizes, ensuring a seamless experience on mobile, tablet, and desktop devices.

---

## Testing
The app uses **Jest** and **React Testing Library** for unit and integration tests. Available tests include:
- Component rendering tests
- API service mocks and validation
- Accessibility checks for responsiveness and usability

Run tests with:
```bash
npm test
```

---

## Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push the branch to your fork and create a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Acknowledgements
- Data provided by the [REST Countries API](https://restcountries.com/).
- Design powered by [TailwindCSS](https://tailwindcss.com/).
- Smooth animations thanks to [Framer Motion](https://www.framer.com/motion/).
- Guided by [GitHub Classroom](https://classroom.github.com).

---

## Feedback
If you have feedback or suggestions, feel free to open an issue or drop a message. Happy coding!