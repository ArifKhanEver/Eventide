<div align="center">

# 🌆 Eventide

### Discover events. Host your own. All in one place.

**A production-ready, full-stack event management platform built with Next.js 16 and TypeScript.**

[Live Demo](https://eventide-flame.vercel.app) · [GitHub](https://github.com/ArifKhanEver/Eventide) · [Demo Credentials](#-demo-credentials)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Demo Credentials](#-demo-credentials)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Data Models](#-data-models)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## ✨ About

**Eventide** is a full-stack event management platform built for **SCIC-13 Assignment 3: Production-Ready Full-Stack Project with TypeScript**. It lets people discover conferences, concerts, workshops, sports events, networking meetups, and festivals — and lets organizers publish and manage their own events with a clean, role-protected dashboard.

The project was built end-to-end with production practices in mind: strict TypeScript, secure API routes with owner/admin authorization, server-rendered pages where it matters, and a consistent dusk-toned design system throughout.

> 🔗 **Live Site:** [your-live-url-here.vercel.app](#) &nbsp;·&nbsp; 🐙 **Repository:** [github.com/your-username/eventide](#)
>
> *(Replace both links above once deployed — see the [Getting Started](#-getting-started) section.)*

---

## 🚀 Features

| | |
|---|---|
| 🔍 **Explore & Filter** | Search by title, filter by category & city, sort by date or price, with pagination |
| 📄 **Event Details** | Public detail pages with gallery, key info, reviews, and related events |
| ➕ **Add Events** | Protected form with full client-side validation via React Hook Form |
| 🛠️ **Manage Events** | Organizers see their own events; admins see everything, with edit/delete controls |
| 🔐 **Authentication** | Email/password auth via Better Auth, with session-protected routes |
| 👑 **Role-Based Access** | Built-in `user` / `admin` roles — admins can manage all events on the platform |
| 📊 **Live Platform Stats** | Landing page pulls real counts straight from MongoDB — no fake numbers |
| 📱 **Fully Responsive** | Consistent, mobile-first layout across every page |
| 🌙 **Twilight Design System** | A fixed dark theme built around a custom dusk/amber color palette |

---

## 🧰 Tech Stack

**Frontend**
- [Next.js 16](https://nextjs.org/) — App Router + Turbopack
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/) — strict mode
- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first `@theme` config
- [HeroUI v3](https://heroui.com/) — accessible component primitives
- [React Hook Form](https://react-hook-form.com/) — form state & validation
- [Framer Motion](https://www.framer.com/motion/) — animation
- [Recharts](https://recharts.org/) · [date-fns](https://date-fns.org/) · [react-icons](https://react-icons.github.io/react-icons/)

**Backend**
- Next.js API Routes
- [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose](https://mongoosejs.com/) — application data (events, reviews)
- [Better Auth](https://www.better-auth.com/) — authentication & session management, with the `admin` plugin for role-based access

**Tooling**
- ESLint 9 (flat config) · npm · Git/GitHub

---

## 🔑 Demo Credentials

Use these accounts to explore the platform without registering:

| Role | Email | Password |
|---|---|---|
| 👑 **Admin** | `admin@eventide.app` | `Admin@12345` |
| 👤 **User** | `demo@eventide.app` | `Demo@12345` |

> The admin account can view and manage **every** event on the platform. The demo user account can only manage events it created.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 20+
- A MongoDB Atlas cluster (or local MongoDB instance)
- npm

### 1. Clone & Install

```bash
git clone https://github.com/your-username/eventide.git
cd eventide
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret_string
BETTER_AUTH_URL=http://localhost:3000

SEED_ADMIN_EMAIL=admin@eventide.app
SEED_ADMIN_PASSWORD=Admin@12345
SEED_DEMO_EMAIL=demo@eventide.app
SEED_DEMO_PASSWORD=Demo@12345
```

### 3. Seed the Database

Populates demo events, reviews, an admin account, and a demo user account:

```bash
npm run seed
```

### 4. Run the Dev Server

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 📁 Project Structure

```
eventide/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── login/, register/              # Auth pages
│   ├── about/, contact/                # Static pages
│   ├── events/
│   │   ├── page.tsx                    # Explore / Listing
│   │   ├── [id]/page.tsx               # Event Details
│   │   ├── add/page.tsx                # Protected — Add Event
│   │   └── manage/page.tsx             # Protected — Manage Events
│   └── api/
│       ├── auth/[...all]/route.ts      # Better Auth handler
│       └── events/
│           ├── route.ts                # GET (list/filter/sort/paginate), POST
│           └── [id]/route.ts           # GET, PATCH, DELETE
├── components/
│   ├── Navbar.tsx, Footer.tsx, HeroSection.tsx
├── lib/
│   ├── db.ts             # Mongoose connection
│   ├── auth.ts           # Better Auth config (native MongoClient + admin plugin)
│   └── auth-client.ts    # Browser auth hooks
├── models/
│   ├── User.ts, Event.ts, Review.ts
├── types/index.ts         # Shared TypeScript types
├── scripts/
│   └── seed.ts            # Database seed script
└── proxy.ts                # Route protection (Next.js 16's middleware)
```

---

## 🗃️ Data Models

<details>
<summary><strong>IEvent</strong></summary>

| Field | Type |
|---|---|
| `title` | `string` |
| `shortDescription` | `string` |
| `fullDescription` | `string` |
| `category` | `Conference \| Concert \| Workshop \| Sports \| Networking \| Festival` |
| `date` | `Date` |
| `time` | `string` |
| `venue` | `string` |
| `city` | `string` |
| `price` | `number` |
| `capacity` | `number` |
| `seatsLeft` | `number` |
| `coverImage` | `string` |
| `gallery` | `string[]` |
| `organizerId` | `ObjectId → User` |
| `status` | `upcoming \| ongoing \| completed` |

</details>

<details>
<summary><strong>IReview</strong></summary>

| Field | Type |
|---|---|
| `eventId` | `ObjectId → Event` |
| `userId` | `ObjectId → User` |
| `rating` | `number (1–5)` |
| `comment` | `string` |

</details>

---

## 🔌 API Reference

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/events` | List events — supports `search`, `category`, `city`, `sort`, `page`, `limit` | Public |
| `POST` | `/api/events` | Create a new event | 🔒 Logged in |
| `GET` | `/api/events/:id` | Get a single event | Public |
| `PATCH` | `/api/events/:id` | Update an event | 🔒 Owner or Admin |
| `DELETE` | `/api/events/:id` | Delete an event | 🔒 Owner or Admin |

---

## 🗺️ Roadmap

- [ ] Reviewer submission form (currently read-only)
- [ ] Social login (Google)
- [ ] Image uploads (currently URL-based)
- [ ] Ticketing & seat reservations
- [ ] Organizer analytics dashboard

---

## 👤 Author

Built as part of **Programming Hero — SCIC-13, Assignment 3: Production-Ready Full-Stack Project with TypeScript.**

<div align="center">

Made with ☕ and a looming deadline.

</div>