# React application

This application is created with [Vite](https://vitest.dev/).

Install dependencies with `npm install`

You can run the application in development mode with `npm run dev`

You can build static files for production release with `npm run build`

## Environment variables

Use env VITE_BACKEND_URL to set where the backend for this application is

# Building Using Docker

    -- shouldn't need this , but under some circumstances may need to manually build or force build?
    docker build -f ./dev.Dockerfile -t todo-frontend .

docker compose -f docker-compose.dev.yml up
