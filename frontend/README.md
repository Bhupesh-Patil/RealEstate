# RealState Frontend Setup Guide

This guide helps you run the frontend locally and connect it to your backend.

## 1) Prerequisites

- Node.js `20.x` (recommended `20.19+`)
- npm
- Backend running on `http://localhost:5000` (or your deployed backend URL)

## 2) Install dependencies

From project root:

```bash
cd frontend
npm install
```

## 3) Environment variables

1. Create `frontend/.env` from `frontend/.env.example`.
2. Set backend URL:

```env
VITE_API_URL=http://localhost:5000
```

If backend is deployed, replace with your live API URL.

## 4) Start frontend

```bash
npm run dev
```

Default local URL:
- `http://localhost:5173`

## 5) Build for production

```bash
npm run build
npm run preview
```

## 6) How API + Socket are connected

- API base URL comes from `VITE_API_URL` in `src/config.js`.
- HTTP requests use this base URL.
- Chat socket also uses the same base URL from `ChatContext`.

So one env variable controls both REST and Socket endpoints.

## 7) Quick verification checklist

- [ ] Backend is running (`http://localhost:5000/` responds)
- [ ] `frontend/.env` has correct `VITE_API_URL`
- [ ] `npm run dev` starts without errors
- [ ] App opens at `http://localhost:5173`
- [ ] Login/register and property listing load correctly
- [ ] Chat connects and receives real-time messages
