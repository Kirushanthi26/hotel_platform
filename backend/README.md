# Hotel Admin Backend

A development-ready backend for an Internal Hotel Admin Tool, built with FastAPI, SQLAlchemy, and Alembic.

## Tech Stack

- Python 3.10+
- FastAPI
- SQLAlchemy (modern style)
- Alembic
- Database: SQLite (default)
- Authentication: JWT

## Setup

1.  **Clone the repository**:

    ```bash
    git clone <repository_url>
    cd hotel_platform/backend
    ```

2.  **Create and activate a virtual environment**:

    ```bash
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

4.  **Database Migrations (Alembic)**:

    First, ensure your `alembic.ini` is configured correctly and your `env.py` points to your SQLAlchemy models.

    To create initial migrations (after defining your models in `app/models.py`):

    ```bash
    alembic revision --autogenerate -m "Initial migration"
    alembic upgrade head
    ```

## Running the Application

To start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The API documentation will be available at `http://127.0.0.1:8000/docs`.
