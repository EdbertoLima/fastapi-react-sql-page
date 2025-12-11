# {{cookiecutter.project_name}}

## Features

- **FastAPI** with Python 3.8
- **React 16** with Typescript, Redux, and react-router
- Postgres
- SqlAlchemy with Alembic for migrations
- Pytest for backend tests
- Jest for frontend tests
- Perttier/Eslint (with Airbnb style guide)
- Docker compose for easier development
- Nginx as a reverse proxy to allow backend and frontend on the same port

## Development

The only dependencies for this project should be docker and docker-compose.

### Quick Start

Starting the project with hot-reloading enabled
(the first time it will take a while):

```bash
docker-compose up -d
```

To run the alembic migrations (for the users table):

```bash
docker-compose run --rm backend alembic upgrade head
```

And navigate to http://localhost:{{cookiecutter.port}}

_Note: If you see an Nginx error at first with a `502: Bad Gateway` page, you may have to wait for webpack to build the development server (the nginx container builds much more quickly)._

Auto-generated docs will be at
http://localhost:{{cookiecutter.port}}/api/docs

### Rebuilding containers:

```
docker-compose build
```

### Restarting containers:

```
docker-compose restart
```

### Bringing containers down:

```
docker-compose down
```

### Frontend Development

Alternatively to running inside docker, it can sometimes be easier
to use npm directly for quicker reloading. To run using npm:

```
cd frontend
npm install
npm start
```

This should redirect you to http://localhost:3000

### Frontend Tests

```
cd frontend
npm install
npm test
```

## Migrations

Migrations are run using alembic. To run all migrations:

```
docker-compose run --rm backend alembic upgrade head
```

To create a new migration:

```
alembic revision -m "create users table"
```

And fill in `upgrade` and `downgrade` methods. For more information see
[Alembic's official documentation](https://alembic.sqlalchemy.org/en/latest/tutorial.html#create-a-migration-script).

## Testing

There is a helper script for both frontend and backend tests:

```
./scripts/test.sh
```

### Backend Tests

```
docker-compose run backend pytest
```

any arguments to pytest can also be passed after this command

### Frontend Tests

```
docker-compose run frontend test
```

This is the same as running npm test from within the frontend directory

## Logging

```
docker-compose logs
```

Or for a specific service:

```
docker-compose logs -f name_of_service # frontend|backend|db
```

## Project Layout

```
.
├── backend
│   └── app
│       ├── alembic
│       │   └── versions          # DB migrations
│       ├── api
│       │   └── api_v1
│       │       └── endpoints     # FastAPI routes
│       ├── core                  # config, settings, security
│       ├── db                    # SQLAlchemy models, session
│       ├── tests                 # pytest tests for backend
│       └── main.py               # backend entrypoint (uvicorn / python app/main.py)
│
├── frontend
│   ├── public
│   └── src
│       ├── components
│       │   └── Home.tsx
│       ├── config
│       │   └── index.ts          # constants (BASE_URL, BACKEND_URL from env)
│       ├── __tests__
│       │   └── test_home.tsx
│       ├── index.tsx             # React entrypoint (createRoot)
│       └── App.tsx               # routing + layout
│
├── sqlpage
│   ├── pages
│   │   ├── index.sql             # main SQLPage homepage (/sqlpage/ or /)
│   │   ├── reports.sql           # example report page
│   │   └── admin.sql             # example admin/dashboard page
│   ├── partials
│   │   ├── header.sql            # shared header
│   │   └── footer.sql            # shared footer
│   ├── assets
│   │   ├── styles.css            # extra CSS if you want
│   │   └── logo.svg
│   └── sqlpage.json              # optional SQLPage config (theme, menu, etc.)
│   # In the container this whole folder is mounted to /var/www
│
├── nginx
│   └── nginx.conf                # reverse proxy for frontend, backend, sqlpage, pgadmin
│
├── pgadmin-data/                 # persisted config for pgAdmin (auto-created by Docker)
│
├── .docker/
│   └── .ipython/                 # your existing IPython volume
│
├── docker-compose.yml            # main stack (nginx, backend, frontend, postgres, redis, sqlpage, pgadmin, worker, flower)
├── .env                           # POSTGRES_*, HOST_PORT, SQLPAGE_PORT, PGADMIN_* (templated by Cookiecutter)
├── README.md
└── etc...

```
