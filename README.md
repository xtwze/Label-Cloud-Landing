# LabelCloud

Public landing page and enquiry API for LabelCloud.

## Structure

- `frontend/`: Next.js 16, React 19, TypeScript, Tailwind CSS and GSAP.
- `backend/`: Java 21, Spring Boot 4, Spring MVC, PostgreSQL and Flyway.
- `compose.yaml`: local PostgreSQL.

## Local development

1. Start PostgreSQL:

   ```bash
   docker compose up -d postgres
   ```

2. Start the backend:

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. Start the frontend in another terminal:

   ```bash
   cd frontend
   cp .env.example .env.local
   pnpm dev
   ```

The site is available at `http://localhost:3000`. The public API listens at `http://localhost:8080`.
The isolated development PostgreSQL is exposed on `localhost:5433` to avoid colliding with an existing local database.

## Verification

```bash
cd frontend && pnpm lint && pnpm build
cd backend && ./mvnw test
docker compose config --quiet
```

## Configuration

Yandex Metrica stays disabled when `NEXT_PUBLIC_YANDEX_METRICA_ID` is empty. When configured, the script loads only after the visitor accepts analytics cookies.

Administrative enquiry management, authentication and interactive demo access are deliberately left for later releases. The public API currently accepts and validates enquiries only.
