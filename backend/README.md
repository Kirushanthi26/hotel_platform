# Internal Hotel Admin Tool — Backend

This project provides a development-ready backend for an Internal Hotel Admin Tool, built with FastAPI.

## Tech Stack

- **Python 3.10+**
- **FastAPI**: For the web framework.
- **SQLAlchemy**: For the ORM.
- **Alembic**: For database migrations.
- **SQLite**: Default database for local development.
- **JWT Auth**: For API authentication.

## Setup & Running

1.  **Create and activate a virtual environment**:
    ```bash
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```

2.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Create a `.env` file**:
    Create a file named `.env` in the project root and add the following environment variables.

    ```env
    DATABASE_URL=sqlite:///./dev.db
    SECRET_KEY=a-very-secret-key-that-you-should-change
    ACCESS_TOKEN_EXPIRE_MINUTES=60
    ALGORITHM=HS256

    # Default admin user credentials for seeding
    FIRST_SUPERUSER_EMAIL=admin@hotel.com
    FIRST_SUPERUSER_PASSWORD=admin123
    ```

4.  **Run Alembic migrations**:
    This will create all the necessary tables in your database.
    ```bash
    alembic upgrade head
    ```

5.  **Seed the database**:
    This script populates the database with initial data, including a default admin user, a hotel, room types, and a rate adjustment. It is safe to run multiple times.
    ```bash
    python seed.py
    ```

6.  **Start the server**:
    ```bash
    uvicorn app.main:app --reload
    ```

## API Documentation

Once the server is running, you can access the interactive API documentation (Swagger UI) at:
[http://localhost:8000/docs](http://localhost:8000/docs)

## Seed User

The seed script creates a default user with the following credentials:
- **Email**: `admin@hotel.com`
- **Password**: `admin123`

You can use these credentials to log in and get an access token from the `/api/v1/login/access-token` endpoint.

## Notes

- The application uses **SQLite** by default for simplicity and quick setup. You can switch to **PostgreSQL** by updating the `DATABASE_URL` in your `.env` file.
- This project intentionally omits role-based access control. Any authenticated user can perform all CRUD operations.