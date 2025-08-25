# Book Review App

A simple MERN (MongoDB, Express, React, Node) book review application with a TailwindCSS frontend (Vite).

This README explains how to run the app locally, build for production, and includes project structure, API endpoints, environment variables, and troubleshooting notes (including the Tailwind/PostCSS ESM fix).

---

## Quick summary
- Backend: Express + Mongoose (API served on port 3000 by default)
- Frontend: React + Vite + TailwindCSS (dev server on port 5173 by default)
- Database: MongoDB (local or Atlas)

## Repo layout
```
book-review-app/
├─ backend/          # Express API, models, routes
│  ├─ models/
│  │  ├─ Book.js
│  │  └─ Review.js
│  ├─ routes/
│  │  ├─ books.js
│  │  └─ reviews.js
│  ├─ server.js
│  └─ package.json
├─ frontend/         # React (Vite) + TailwindCSS UI
│  ├─ src/
│  ├─ index.html
│  ├─ package.json
│  └─ tailwind/postcss config
└─ README.md         # (this file)
```

## Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)
- git

## Environment variables
Create a `.env` file in the `backend/` folder with at least:

```
MONGO_URI=<your-mongodb-connection-string>
PORT=3000
NODE_ENV=development
```

If you add any auth or JWT secrets, add them here as well.

## Backend - run locally
From project root or inside `backend/`:

```bash
# from repo root
cd backend
npm install
# start in dev mode (nodemon watches changes)
npm run dev
# or run once
npm start
```

Default API base: `http://localhost:3000`

Backend package scripts (from `backend/package.json`):
- `npm run dev` — start server with `nodemon server.js`
- `npm start` — start server with `node server.js`

## Frontend - run locally
From project root or inside `frontend/`:

```bash
cd frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

Frontend package scripts (from `frontend/package.json`):
- `npm run dev` — start Vite dev server
- `npm run build` — build production assets (outputs `dist/`)
- `npm run preview` — preview built assets locally

> Note: frontend `package.json` includes "type": "module" so PostCSS config needs to use ESM syntax (see Troubleshooting).

## API Endpoints (observed from `backend/routes`)
- `GET /api/books` — returns all books (populates reviews)
- `POST /api/books` — add a new book (body: `{ title, author, genre }`)
- `GET /api/books/:id` — get single book with populated reviews
- `DELETE /api/books/:id` — delete a book
- `POST /api/reviews` — add a new review. Body expected: `{ bookId, rating, comment }` (server links review to the book)

Adjust the frontend API base if you host the backend elsewhere.

## TailwindCSS / PostCSS notes (important)
You may encounter two common issues when running the frontend:

1) "module is not defined in ES module scope"
- Cause: `postcss.config.js` is CommonJS while `frontend/package.json` contains `"type": "module"`.
- Fix: Convert `postcss.config.js` to ESM (use `export default {...}`), or rename to `postcss.config.cjs` to force CommonJS.

2) "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin"
- Fix: install and use the official PostCSS wrapper if required. In this repo we installed `@tailwindcss/postcss` and updated `postcss.config.js` to reference `'@tailwindcss/postcss'`.

Example ESM `postcss.config.js` used here:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

If you prefer commonjs, rename the file to `postcss.config.cjs` and use:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

## Styling notes
- Body background: `#f9fafb` (soft gray) to let white book cards stand out
- Book cards: white background, rounded corners, subtle shadow (CSS/Tailwind utilities in `src/index.css`)
- Reviews: light gray boxes (`#f1f5f9`)
- Buttons: blue (Add) and red (Delete) with hover states

## Troubleshooting
- Frontend build fails with PostCSS/Tailwind errors: see the PostCSS section above.
- Backend can't connect to MongoDB: verify `MONGO_URI` and network access (Atlas IP whitelist or local Mongo running).
- CORS: Backend has CORS configured to allow origin `http://localhost:5173`. If you host the frontend elsewhere, update the `cors()` config in `backend/server.js`.
- Ports: Frontend default 5173 (Vite), backend default 3000 (Express). Ensure they don't conflict with other services.

## Contributing
1. Fork the repo
2. Create a feature branch
3. Run tests / verify locally
4. Open a pull request with a clear description

## License
Add a license file or update this section (e.g. MIT).

---

If you want, I can:
- Add this `README.md` to the repository (I just created it),
- Expand sections with exact copy-ready deploy commands for GitHub Actions or a Vercel setup,
- Add short run/debug scripts or a `.env.example` file.

Which of these would you like me to do next?
