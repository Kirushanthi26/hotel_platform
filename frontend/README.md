# Hotel Management System Frontend

This is the frontend application for the Hotel Management System, built with modern web technologies to provide a responsive and interactive user experience.

## Technologies Used

-   **React.js (with Vite):** A JavaScript library for building user interfaces, with Vite as a fast build tool.
-   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
-   **React Router DOM:** For declarative routing in React applications.
-   **React Query (TanStack Query):** For fetching, caching, synchronizing, and updating server state.
-   **Axios:** A promise-based HTTP client for the browser and Node.js.
-   **Zod:** A TypeScript-first schema declaration and validation library.
-   **ShadCN UI:** A collection of re-usable components built using Radix UI and Tailwind CSS.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
-   **Date-fns:** A modern JavaScript date utility library.
-   **Lucide React:** A beautiful collection of open-source icons.

## Installation

To get the project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Running the Project

After installation, you can run the development server:

```bash
npm run dev
```

This will start the Vite development server, and you can access the application in your browser, typically at `http://localhost:5173`.

## API Endpoints

This frontend interacts with a backend API, assumed to be running on `http://localhost:8000`. Key endpoints include:

-   **Authentication:** `POST http://localhost:8000/api/v1/login/access-token`
-   **User Details:** `GET http://localhost:8000/api/v1/users/` (Protected)
-   **Hotels:**
    -   `GET http://localhost:8000/api/v1/hotels/` (Protected)
    -   `GET http://localhost:8000/api/v1/hotels/{id}` (Protected)
    -   `POST http://localhost:8000/api/v1/hotels/` (Protected)
    -   `PUT http://localhost:8000/api/v1/hotels/{id}` (Protected)
    -   `DELETE http://localhost:8000/api/v1/hotels/{id}` (Protected)
-   **Room Types:**
    -   `GET http://localhost:8000/api/v1/room-types/` (Protected)
    -   `POST http://localhost:8000/api/v1/room-types/` (Protected)
    -   `PUT http://localhost:8000/api/v1/room-types/{id}` (Protected)
    -   `DELETE http://localhost:8000/api/v1/room-types/{id}` (Protected)
-   **Rate Adjustments:**
    -   `GET http://localhost:8000/api/v1/rate-adjustments/` (Protected)
    -   `POST http://localhost:8000/api/v1/rate-adjustments/` (Protected)
