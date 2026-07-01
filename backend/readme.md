# RealState Backend Setup Guide

This document explains the full backend setup from zero to running state.

## 1) Prerequisites

- Node.js `20.x` (recommended `20.19+`)
- npm (comes with Node)
- MongoDB Atlas cluster (or local MongoDB)
- Cloudinary account (for image upload)
- Brevo account (for email sending)

## 2) Install dependencies

From the project root:

```bash
cd backend
npm install
```

## 3) Environment variables

Create/update `backend/.env` with the values below:

```env
JWT_SECRET=replace_with_a_long_random_secret
PORT=5000
MONGO_URI=mongodb+srv://<db_user>:<db_password>@<cluster-url>/realstate?retryWrites=true&w=majority&appName=Cluster0

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_KEY=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_verified_sender_email@example.com
BREVO_API_KEY=your_brevo_api_key
```

## 4) MongoDB setup (Atlas)

1. Create a cluster in MongoDB Atlas.
2. Create a database user with read/write permission.
3. In Network Access, allow your current IP (or `0.0.0.0/0` temporarily for testing).
4. Copy the Node connection string.
5. Replace `<db_user>`, `<db_password>`, and `<cluster-url>` in `MONGO_URI`.
6. Keep the DB name in URI as `realstate` (or your preferred DB name).

If DB connection fails:
- verify username/password
- URL-encode special characters in password
- confirm IP is allowed in Atlas

## 5) Cloudinary setup (property/user image uploads)

1. Sign in to Cloudinary.
2. Open Dashboard/API Keys.
3. Copy:
   - Cloud name -> `CLOUD_NAME`
   - API Key -> `CLOUD_KEY`
   - API Secret -> `CLOUD_SECRET`

Backend file using these values: `backend/config/cloudinary.js`.

## 6) Brevo email setup (auth + contact flow)

1. Create/login Brevo account.
2. Verify sender email (must match `EMAIL_USER`).
3. Generate API key from Brevo SMTP/API settings.
4. Put API key in `BREVO_API_KEY`.

Backend file using these values: `backend/utils/sendEmail.js`.

## 7) Start backend

Development:

```bash
npm run dev
```

Production-like run:

```bash
npm start
```

Expected startup logs:
- `DB connected`
- `Server Started on http://localhost:5000`

## 8) Verify endpoints

- Health check: `http://localhost:5000/`
  - expected response: `{"message":"API is working"}`
- Swagger docs: `http://localhost:5000/api-docs`

## 9) API route groups available

- `/api/auth`
- `/api/user`
- `/api/property`
- `/api/inquiry`
- `/api/wishlist`
- `/api/admin`
- `/api/chat`
- `/api/contact`

## 10) Common issues and fixes

- `connect ECONNREFUSED 127.0.0.1:27017`
  - Local MongoDB is not running OR `MONGO_URI` not set to Atlas URI.

- `Missing MONGO_URI in environment variables`
  - Add `MONGO_URI` in `backend/.env`.

- `EADDRINUSE: address already in use :::5000`
  - Another backend process is already running on port `5000`.
  - Stop that process or change `PORT` in `.env`.

- Email sending fails
  - Check `BREVO_API_KEY` and ensure `EMAIL_USER` is a verified sender.

- Cloudinary upload fails
  - Recheck `CLOUD_NAME`, `CLOUD_KEY`, `CLOUD_SECRET`.

## 11) Security notes

- Never commit `.env` to public repos.
- Rotate exposed credentials immediately (DB password/API keys).
- Use a strong random `JWT_SECRET`.
- Restrict Atlas IP access in production.

## 12) Quick start checklist

- [ ] `npm install` completed in `backend`
- [ ] `.env` filled with all required keys
- [ ] Atlas user + IP access configured
- [ ] `npm run dev` starts without errors
- [ ] `http://localhost:5000/` works
- [ ] `http://localhost:5000/swagger` opens
