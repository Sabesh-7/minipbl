# Smart Workflow Rule Engine

Smart Workflow Rule Engine is a full-stack web application for defining, executing, and monitoring business rules with webhook-based automation.

## 1. Tech Stack

- Backend: Spring Boot 4, Spring Security (JWT), Spring Data JPA, PostgreSQL
- Frontend: React 18, TypeScript, Vite, Zustand, Tailwind CSS
- API docs: Springdoc OpenAPI + Swagger UI
- CI/CD: GitHub Actions
- Deployment targets:
  - Frontend: Vercel
  - Backend: Render (Docker)

## 2. Implemented Features

### UI/UX Refinement

- Responsive dashboard layout for mobile/desktop
- Landing page + improved login page UX
- Toast feedback for auth and CRUD actions
- Loading states and empty/error states on pages
- Rule create/edit forms with webhook URL support

### Advanced Logic

- Rule execution via dynamic SpEL expressions
- Search/filter/pagination in execution logs
- Rule list filtering and status toggling
- Third-party integration via outbound webhooks when rule condition is met

### Performance & Testing

- Route-level code splitting with lazy loading and Suspense
- Indexed execution logs in database schema
- Backend unit tests for rule condition evaluator
- Frontend store unit tests with Vitest

### Production Deployment

- Dockerized backend for Render deployment
- SPA rewrite config for Vercel
- Env-driven backend port/profile/CORS
- CI/CD workflow for test, build, and deployment hooks

## 3. Local Development Setup

## Prerequisites

- Java 21+
- Node.js 20+
- pnpm
- PostgreSQL

## Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend health:

```bash
curl http://localhost:8080/api/v1/health
```

## Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend URL:

- http://localhost:5173

## 4. Environment Variables

## Backend (Render or local prod)

- `SPRING_PROFILES_ACTIVE=prod`
- `DB_URL=jdbc:postgresql://<host>:5432/<db>`
- `DB_USERNAME=<username>`
- `DB_PASSWORD=<password>`
- `APP_CORS_ALLOWED_ORIGINS=https://<frontend-domain>`
- `PORT` is provided automatically by Render

## Frontend

Use `frontend/.env`:

```env
VITE_API_URL=http://localhost:8080
```

For production:

```env
VITE_API_URL=https://<your-render-backend>.onrender.com
```

## 5. API Documentation

Swagger UI:

- `http://localhost:8080/swagger-ui/index.html`

OpenAPI JSON:

- `http://localhost:8080/v3/api-docs`

Postman can directly import:

- `http://localhost:8080/v3/api-docs`

## 6. Deployment Guide

## A. Deploy Backend to Render

1. Create a new Web Service in Render.
2. Connect this repository.
3. Use Docker runtime with `backend` as root directory.
4. Render will use `backend/Dockerfile`.
5. Set backend env vars listed above.
6. Deploy and note your backend URL.

Optional: Use `render.yaml` for Infra as Code setup.

## B. Deploy Frontend to Vercel

1. Import repository in Vercel.
2. Set project root to `frontend`.
3. Add env var `VITE_API_URL` with your Render backend URL.
4. Deploy.
5. Verify route refresh works (configured via `frontend/vercel.json`).

## C. CI/CD Pipeline

GitHub Actions workflow is at `.github/workflows/ci-cd.yml`.

It performs:

- Backend tests + package build
- Frontend install + tests + production build
- Optional deploy steps on `main` push if secrets are set

Required GitHub secrets for auto-deploy:

- `RENDER_DEPLOY_HOOK_URL`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 7. Viva Explanation Checklist

Use this structure during final viva:

1. Problem statement:
   - Business teams need configurable automation without hardcoding all workflows.
2. Architecture:
   - React frontend calls secure Spring Boot APIs.
   - Rules stored in PostgreSQL.
   - SpEL engine evaluates conditions.
3. Execution flow:
   - Input payload -> condition evaluation -> execution log -> webhook dispatch.
4. Security:
   - JWT auth, stateless APIs, CORS restriction via env config.
5. Reliability:
   - Unit tests + CI checks + database indexes.
6. Scalability:
   - Route code splitting, external webhook integrations, deployable cloud architecture.

## 8. Suggested Live Demo Flow

1. Login as admin.
2. Create a rule with condition and webhook URL.
3. Execute rule with non-matching input (condition false).
4. Execute rule with matching input (condition true).
5. Show execution log and incoming webhook payload in RequestBin.
6. Show dashboard stats update.

## 9. Project URLs (fill before submission)

- Frontend (Vercel): `https://<your-frontend>.vercel.app`
- Backend (Render): `https://<your-backend>.onrender.com`
- Swagger: `https://<your-backend>.onrender.com/swagger-ui/index.html`
