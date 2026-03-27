# Job Tracker 📋

A full-stack Kanban-style job application tracker. Add roles, drag them across stages, and keep your job search organised — all behind a secure authentication layer.

**Live demo → [job-tracker-app](https://job-tracker-app-hazel-rho.vercel.app)**

---

## Features

- 🔐 **Auth** — register, login, and sign out securely with NextAuth
- 📋 **Kanban board** — five columns: Wishlist, Applied, Interview, Offer, Rejected
- 🖱️ **Drag and drop** — move cards between columns instantly
- ✏️ **Full CRUD** — add, edit, and delete job applications
- 📊 **Live stats** — total applications, interviews, and offers update in real time
- 📱 **Mobile friendly** — tab-based layout on small screens, installable as a PWA
- 🔔 **Toast notifications** — instant feedback on every action
- ⚡ **Optimistic updates** — UI responds immediately, no waiting for the server

---

## Install as an app

Job Tracker works as a Progressive Web App (PWA) — you can save it to your device and use it like a native app, no app store needed.

**On desktop (Chrome / Edge):**
1. Open the live demo in Chrome or Edge
2. Look for the install icon (⊕) in the address bar on the right
3. Click **Install**
4. The app opens in its own window, separate from your browser

**On Android (Chrome):**
1. Open the live demo in Chrome
2. Tap the three-dot menu (⋮) in the top right
3. Tap **Add to Home screen**
4. Tap **Add**

**On iOS (Safari):**
1. Open the live demo in Safari
2. Tap the share icon (□↑) at the bottom
3. Tap **Add to Home Screen**
4. Tap **Add**

Once installed, the app opens full screen with no browser chrome — just like a native app.

---

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | Next.js 15 (App Router), React, Tailwind CSS |
| State | Redux Toolkit, React Query |
| Auth | NextAuth.js (JWT strategy) |
| Backend | Next.js API Routes |
| Database | MongoDB · Mongoose |
| DnD | @hello-pangea/dnd |
| Notifications | react-hot-toast |

---

## Getting started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas account

### Setup
```bash
git clone https://github.com/Dunni0/job-tracker.git
cd job-tracker
npm install
```

Create a `.env.local` file in the root:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/job-tracker
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

Then start the dev server:
```bash
npm run dev
```

App runs at `http://localhost:3000`.

---

## Project structure
```
job-tracker/
├── lib/                    # MongoDB connection helpers
├── models/                 # Mongoose schemas (Job, User)
├── src/
│   ├── app/
│   │   ├── api/            # API routes (auth, jobs, register)
│   │   ├── home/           # Main board page
│   │   └── login/          # Auth page
│   ├── components/         # UI components (Board, Column, JobCard, TopBar...)
│   ├── modals/             # JobModal (add, edit, delete, sign out)
│   ├── providers/          # Redux, React Query, NextAuth providers
│   ├── store/              # Redux slices + job service layer
│   └── middleware.js       # Route protection
└── public/                 # Icons, manifest, static assets
```

---

## Author

Made by **Pelumi Awonuga** — [LinkedIn](https://www.linkedin.com/in/oluwapelumi-awonuga-841997221) · [pelumioladunni3@gmail.com](mailto:pelumioladunni3@gmail.com)
