
# Golden Raspberry Awards Frontend

This is a React frontend application that interacts with the Golden Raspberry Awards API to display information about movies, producers, and studios associated with the Golden Raspberry Awards.

## Features

- **Years with Multiple Winners**: List all years that have multiple winners.
- **Top Studios with Winners**: Display the top 3 studios with the highest number of wins.
- **Producers with Interval Wins**: Show producers with the longest and shortest intervals between wins.
- **Movie Winner Search**: Search for movie winners by a specific year.
- **Movie List**: Paginated list of all movies with filtering options for year and winner status.

## Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/golden-raspberry-awards.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd golden-raspberry-awards
   ```

3. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Running the Application

To start the development server, run:

```bash
npm start
```

This will start the application on `http://localhost:3000`.

### Environment Variables

The application uses an external API. Make sure to set any necessary environment variables if required. By default, the API base URL is set to:

```javascript
https://challenge.outsera.tech/api/movies
```

## Running Tests

To run the test suite, use:

```bash
npm test
```

## Project Structure

- **`src/`**
  - **`layout/`**: Contains layout components like `Navbar` and `Sidebar`, and the main `App` component.
  - **`pages/`**
    - **`Dashboard/`**: Components and styles for the dashboard page.
    - **`MovieList/`**: Components and styles for the movie list page.
    - **`interfaces/`**: TypeScript interfaces for data models.
  - **`routes/`**: Application routing configurations.
  - **`services/`**: API service configuration using Axios.
  - **`tests/`**: Unit and integration tests for components and pages.
- **`public/`**: Public assets and the `index.html` file.
- **`package.json`**: Project dependencies and scripts.
- **`README.md`**: Project documentation.

## Technologies Used

- **React** with **TypeScript** for building the user interface.
- **React Router DOM** for client-side routing.
- **Styled Components** for styling React components.
- **Axios** for making HTTP requests to the API.
- **React Hook Form** and **Yup** for form handling and validation.
- **React Icons** for iconography.
- **Jest** and **React Testing Library** for testing.

## API Reference

The application interacts with the Golden Raspberry Awards API provided at:

```
https://challenge.outsera.tech/api/movies
```

### Endpoints Used

- **GET** `/` with query parameters:
  - `projection`: For specific data projections like `max-min-win-interval-for-producers`, `studios-with-win-count`, or `years-with-multiple-winners`.
  - `winner`: Filter movies by winner status.
  - `year`: Filter movies by year.
  - `page` and `size`: For pagination.

## License

This project is licensed under the **MIT License**.
