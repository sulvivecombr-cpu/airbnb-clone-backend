# Base44 Dev Environment

## Project Overview
Spring Boot 3.2.4 (Java 21) Airbnb clone backend API. PostgreSQL database with Liquibase migrations. Auth0 (Okta) OAuth2 authentication.

## Running the App
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
- App listens on port 8080 inside the container, mapped to host port 3000.
- PostgreSQL runs as a separate compose service (`postgres:16`).
- Maven builds and runs with `mvn spring-boot:run -DskipTests` — live reload via Spring Boot DevTools.

## Key Configuration
- **Active profile**: `dev` (set in `application.yml`)
- **Datasource**: provided via `SPRING_DATASOURCE_URL` env var (dev profile does not define it; prod profile uses `${POSTGRES_URL}` placeholders)
- **`SPRING_DOCKER_COMPOSE_ENABLED=false`**: disables Spring Boot's built-in Docker Compose support (we manage containers ourselves)
- **PostgreSQL schema**: `airbnb_clone` — created via `/tmp/init-airbnb-schema.sql` mounted into the Postgres init directory
- **Auth0**: `okta.oauth2.client-id` / `client-secret` resolve from `AUTH0_CLIENT_ID` / `AUTH0_CLIENT_SECRET` env vars. Placeholder values are generated for development; real Auth0 credentials are needed for authentication to work.

## Health Check
- `GET /assets/countries.json` (permitAll in SecurityConfiguration) — returns static JSON.
- No Spring Boot Actuator endpoint available (not in dependencies).

## Public API Endpoints (no auth required)
- `GET /api/tenant-listing/get-all-by-category?category=<BookingCategory>&page=<n>&size=<n>`
- `GET /api/tenant-listing/get-one?publicId=<uuid>`
- `POST /api/tenant-listing/search`
- `GET /api/booking/check-availability`
- `GET /assets/*`

## Verification
```bash
# Check app is serving
curl -sf http://localhost:3000/assets/countries.json | head -c 100

# Check container health
docker compose -f docker-compose.base44.yml ps
```

## Notes
- First boot takes several minutes (Maven downloads dependencies). Health check has a 300s start period.
- The `hs_err_pid*.log` file in the repo root is a stale JVM crash log, not relevant to the app.
- Frontend is a separate Angular project (not in this repo).
