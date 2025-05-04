# World Countries Search Website

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

## Description
This is a **full-stack web application** designed for searching and exploring information about countries around the world.
The **frontend** uses the **REST Countries API** to fetch and display country-related data, such as population, capital, and more, along with dynamic features like filtering and detail views.

The **backend** (built with **Express.js**) complements the frontend by providing additional APIs if needed—for example, user authentication, or storing user preferences.
This repository brings together powerful tooling for both frontend and backend development.

---

## Features
- **Frontend**:
  - Search for world countries using the REST Countries API.
  - Filter countries by region and view detailed country information.
  - Bookmark countries as user preference
  - Responsive layout and animations with TailwindCSS and Framer Motion.

- **Backend**:
  - Extendable Express.js server setup to handle APIs if needed.
  - Optional support for features like user authentication and preferences storage.
  - MongoDB integration using Mongoose for data persistence.

---

## Prerequisites
Before starting, ensure that you have the following installed:
- **Node.js** (version 16 or newer recommended)
- **npm** (Node.js package manager)

---

## Tech Stack
- **Frontend**: React 19.0.0, TailwindCSS 4.1.5, React Router, Framer Motion
- **Backend**: Node JS, Express JS, MongoDB, JWT, Bcrypt js
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

## Configure Environment Variables

#### Frontend `.env`
Create a `.env` file in the `client` directory with the following(Look for env.example):
```dotenv
VITE_REST_COUNTRIES_API_URL=https://restcountries.com/v3.1
```

#### Backend `.env`
Create a `.env` file in the `server` directory with the following(Look for env.examople):
```dotenv
PORT=5000
MONGO_URI=mongodb://localhost:27017/world-countries-db
JWT_SECRET=my_secret_key
```


## Folder Structure

```plaintext
project-folder
├── src
│   ├── components     # Reusable React components (e.g., SearchBar, CountryCard)
│   ├── pages          # Routes/pages for the app (e.g., Home, Country Details)
│   ├── contexts          # Custom React Hooks
│   ├── services       # API calls (REST Countries API)
│   ├── assets         # TailwindCSS configuration
├── public             # Static assets
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