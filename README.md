# Agnos Screening Test — Patient Intake (Real-time)

A real-time patient intake system consisting of two projects:

| Project | Stack | Location |
|---|---|---|
| **Frontend (FE)** | Next.js 16, React 19, TypeScript, Tailwind CSS 4, TanStack Query, Socket.IO Client | `agos-test-fe/` (this repo) |
| **Backend (BE)** | Node.js, Express 5, Socket.IO | `agnos-test-be/` ([repo](https://github.com/shunlll999/screen-test-agnos-hr-services)) |

Patients fill in an intake form on the **Patient** page, and staff can watch form data update in real time on the **Staff** dashboard via Socket.IO.

> 📋 See [DEVELOPMENT.md](DEVELOPMENT.md) for development planning documentation — project structure, UI/UX design decisions, component architecture, and the real-time synchronization flow.

---

## Prerequisites

- **Node.js** ≥ 20 (LTS recommended)
- **yarn** or **npm**
- The FE and BE projects cloned as sibling folders (recommended):

```
WORKS/
├── agos-test-fe/    # Frontend (this repo)
└── agnos-test-be/   # Backend
```

---

## 1) Backend Setup (`agnos-test-be`)

### Install dependencies

```bash
cd agnos-test-be
yarn install
# or: npm install
```

### Environment variables

The backend reads these variables (all optional for local dev — defaults shown):

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3006` | Port the API/Socket.IO server listens on |
| `CLIENT_URL` | `http://localhost:3000` | Allowed CORS origin (the frontend URL) |

No `.env` file is required for local development if you use the defaults.

### Run locally

```bash
# Development (auto-reload with nodemon)
yarn serve
# or: npm run serve

# Production mode
yarn start
# or: npm start
```

The server starts at **http://localhost:3006** — you should see:

```
🚀 Server is running on port 3006
```

### API Endpoints

Base path: `/api/patients`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/patients/session` | Generate a new patient session ID |
| `POST` | `/api/patients/intake` | Submit a new patient intake form |
| `PUT` | `/api/patients/intake` | Update an existing patient intake |
| `GET` | `/api/patients/existing` | List existing patients |
| `GET` | `/api/patients/existing-id/:id` | Get an existing patient by ID |

Socket.IO runs on the same port for real-time sync with the staff dashboard.

---

## 2) Frontend Setup (`agos-test-fe`)

### Install dependencies

```bash
cd agos-test-fe
yarn install
# or: npm install
```

### Environment variables

Create a `.env` file in the project root. To point at your **local backend**:

```bash
# .env
NEXT_PUBLIC_BASE_API_URL=http://localhost:3006/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3006
```

To use the **deployed backend** (Heroku) instead:

```bash
# .env
NEXT_PUBLIC_BASE_API_URL=https://agnos-test-be-423b4c6fe470.herokuapp.com/api
NEXT_PUBLIC_SOCKET_URL=https://agnos-test-be-423b4c6fe470.herokuapp.com
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_API_URL` | Base URL of the backend REST API (must include `/api`) |
| `NEXT_PUBLIC_SOCKET_URL` | Base URL of the Socket.IO server (no path suffix) |

> If a variable is not set, the app falls back to the deployed Heroku backend.

### Run locally

**Important:** start the backend first (step 1), then:

```bash
yarn dev
# or: npm run dev
```

Open **http://localhost:3000** in your browser.

### Pages

| Route | Description |
|---|---|
| `/` | Home — links to Patient and Staff views |
| `/patient` | Patient intake form (creates/updates a session in real time) |
| `/staff` | Staff dashboard — live view of patient sessions via Socket.IO |

> Tip: open `/patient` and `/staff` in two separate windows to see the real-time sync in action.

### Other scripts

```bash
yarn build   # Production build (static export to ./out)
yarn lint    # Run ESLint
```

---

## Quick Start (TL;DR)

```bash
# Terminal 1 — Backend
cd agnos-test-be
yarn install
yarn serve                 # → http://localhost:3006

# Terminal 2 — Frontend
cd agos-test-fe
yarn install
printf 'NEXT_PUBLIC_BASE_API_URL=http://localhost:3006/api\nNEXT_PUBLIC_SOCKET_URL=http://localhost:3006\n' > .env
yarn dev                   # → http://localhost:3000
```

---

## Deployment

- **Frontend:** static export (`output: "export"` in [next.config.ts](next.config.ts)) deployed to **Firebase Hosting**. Production env vars live in `.env.production`.

  ```bash
  yarn build
  firebase deploy
  ```

- **Backend:** deployed to **Heroku** at `https://agnos-test-be-423b4c6fe470.herokuapp.com`. Remember to set `CLIENT_URL` on Heroku to the deployed frontend URL so CORS allows it.

---

## Project Structure (Frontend)

```
src/
├── app/            # Next.js App Router pages (/, /patient, /staff)
├── components/     # UI components (ui, pack, patient, staff)
├── hook/           # Custom hooks (usePatientSession, useLiveSessions, useFlipAnimation)
├── lib/            # API adapter, zod schemas, types, constants, session utils
└── providers/      # App providers (TanStack Query, etc.)
```
