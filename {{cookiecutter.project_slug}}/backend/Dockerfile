FROM python:3.12-slim

# Environment: Python behaves well inside Docker
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=on \
    PATH="/root/.local/bin:$PATH"

# Create the application directory
WORKDIR /app

# ---------- System dependencies ----------
# Needed for psycopg2, SQLAlchemy, Alembic, pip compiling
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc \
        libpq-dev \
        build-essential \
        postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# ---------- Install Python dependencies ----------
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ---------- Copy backend source code ----------
COPY . .

# ---------- Optional: sanity check ----------
RUN alembic --version

# Default command overridden by docker-compose (python app/main.py)
CMD ["python", "app/main.py"]
