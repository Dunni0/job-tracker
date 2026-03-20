# Job Tracker 📋

A full-stack Kanban-style job application tracker. Add roles, drag them across stages, and keep your job search organised — all behind a secure authentication layer.

**Live demo → [job-tracker-app](https://job-tracker-app-dunni0s-projects.vercel.app)**

---

## Features

- 🔐 **Auth** — register, login, and sign out securely with NextAuth
- 📋 **Kanban board** — five columns: Wishlist, Applied, Interview, Offer, Rejected
- 🖱️ **Drag and drop** — move cards between columns instantly
- ✏️ **Full CRUD** — add, edit, and delete job applications
- 📊 **Live stats** — total applications, interviews, and offers update in real time
- 📱 **Mobile friendly** — tab-based layout on small screens
- 🔔 **Toast notifications** — instant feedback on every action
- ⚡ **Optimistic updates** — UI responds immediately, no waiting for the server

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
└── public/
```

---

## Author

Made by **Pelumi Awonuga** — [LinkedIn](https://www.linkedin.com/in/oluwapelumi-awonuga-841997221) · [pelumioladunni3@gmail.com](mailto:pelumioladunni3@gmail.com)
