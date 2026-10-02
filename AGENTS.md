# Base44 Dev Environment

## Project Overview
Full-stack Airbnb clone: Spring Boot 3.2.4 (Java 21) backend API + Angular 17 frontend. PostgreSQL database with Liquibase migrations. Auth0 (Okta) OAuth2 authentication.

## Running the App
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
Three compose services:
- **postgres** — PostgreSQL 16 database
- **backend** — Spring Boot API (Maven, Java 21), internal port 8080, exposed on host port 8000 for debugging
- **frontend** — Angular 17 dev server (Node 20), port 4200, mapped to host port 3000 (preview port)

The frontend proxies `/api`, `/oauth2`, `/login`, `/assets` to the backend via `proxy.conf.mjs`.

## Key Configuration
- **Backend active profile**: `dev` (set in `application.yml`)
- **Datasource**: provided via `SPRING_DATASOURCE_URL` env var (dev profile does not define it)
- **`SPRING_DOCKER_COMPOSE_ENABLED=false`**: disables Spring Boot's built-in Docker Compose support
- **PostgreSQL schema**: `airbnb_clone` — created via `/tmp/init-airbnb-schema.sql` mounted into the Postgres init directory
- **Auth0**: `okta.oauth2.client-id` / `client-secret` resolve from `AUTH0_CLIENT_ID` / `AUTH0_CLIENT_SECRET` env vars. Placeholder values are generated for development; real Auth0 credentials are needed for authentication to work.
- **Frontend API_URL**: set to `/api` (relative) in `environment.ts` and `environment.development.ts` — requests go through the Angular dev server proxy to the backend.
- **Frontend proxy target**: `http://backend:8080` (Docker service name)

## Health Checks
- **Backend**: `GET /assets/countries.json` (permitAll in SecurityConfiguration) — returns static JSON
- **Frontend**: `GET /` — Angular app root page
- No Spring Boot Actuator endpoint available (not in dependencies)

## Public API Endpoints (no auth required)
- `GET /api/tenant-listing/get-all-by-category?category=<BookingCategory>&page=<n>&size=<n>`
- `GET /api/tenant-listing/get-one?publicId=<uuid>`
- `POST /api/tenant-listing/search`
- `GET /api/booking/check-availability`
- `GET /assets/*`

## Verification
```bash
# Check all containers
docker compose -f docker-compose.base44.yml ps

# Check frontend is serving
curl -sf http://localhost:3000/ | head -c 100

# Check API proxy works through frontend
curl -sf "http://localhost:3000/api/tenant-listing/get-all-by-category?category=ALL&page=0&size=5"
```

## Notes
- First boot takes several minutes (Maven downloads deps + npm install + Angular compilation). Backend health check has 300s start period, frontend 120s.
- The `hs_err_pid*.log` file in the repo root is a stale JVM crash log, not relevant to the app.
- Frontend was cloned from `https://github.com/MatheusOtenio/airbnb-clone-frontend.git` into `frontend/`.
- `--disable-host-check` is not supported by Angular's application builder; `--host 0.0.0.0` is used instead and works for the preview.
- A simple `index.html` landing page was added to the backend's `static/` folder (used before the frontend was integrated; no longer the primary entry point).
- X-Frame-Options was disabled in `SecurityConfiguration.java` to allow iframe embedding in the preview.
