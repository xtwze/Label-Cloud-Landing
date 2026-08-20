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

### Private administration

The administration page is intentionally not linked from the public landing page. Open it directly at `http://localhost:3000/admin`.

Set the backend credentials before starting Spring Boot:

```bash
export LABELCLOUD_ADMIN_USERNAME=owner
export LABELCLOUD_ADMIN_PASSWORD='{noop}replace-this-for-local-development'
```

`{noop}` is acceptable only for local development. For deployment, provide a delegated bcrypt value such as `{bcrypt}$2a$...` and enable `SESSION_COOKIE_SECURE=true` behind HTTPS. If either admin credential is empty, admin login stays disabled.

## Verification

```bash
cd frontend && pnpm lint && pnpm build
cd backend && ./mvnw test
docker compose config --quiet
```

## Configuration

Yandex Metrica stays disabled when `NEXT_PUBLIC_YANDEX_METRICA_ID` is empty. When configured, the script loads only after the visitor accepts analytics cookies.

The protected administration area uses a server-side Spring Security session and CSRF protection. Interactive demo access remains a later release.
