# Mindboard

## Overview

This repository contains a simple **admin dashboard** for managing a product catalog.
It is built as a **monorepo** using `pnpm workspaces`, with the following stack:

* **Frontend:** React, TypeScript, Vite
* **Backend:** AdonisJS (REST API)
* **Database:** PostgreSQL
* **Architecture:** Monorepo with shared types/utilities

Core features:

* Basic authentication (login/logout)
* CRUD for products (create, update, delete, list with pagination)
* Filtering by name, price, or stock
* Clear and intuitive interface

---

## Prerequisites

Make sure the following dependencies are installed on your system:

* [Node.js](https://nodejs.org/en/download)
* [pnpm](https://pnpm.io/installation)
* [Docker](https://docs.docker.com/compose/)
* [mkcert](https://github.com/FiloSottile/mkcert) (for local HTTPS certificates)

---

## Setup

### Hosts configuration

Add the following to your `/etc/hosts` file:

```
127.0.0.1 mindboard.local
127.0.0.1 api.mindboard.local
```

### Installation & launch

```bash
# Generate certificates
./init-dev.sh

# Install dependencies
pnpm install

# Launch services (API + Database + Frontend)
pnpm c:u -d
```

The application should then be available at:

* Frontend: [https://mindboard.local](https://mindboard.local)
* API: [https://api.mindboard.local](https://api.mindboard.local)

---

## Environment Variables

### PostgreSQL

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=example
POSTGRES_DB=db
POSTGRES_PORT=5432
```

### AdonisJS Core App

```env
PORT=3333
HOST=0.0.0.0
LOG_LEVEL=info
APP_KEY=random-app-key
NODE_ENV=development
DB_HOST=database    # container service name
DB_PORT=5432
DB_USER=user
DB_PASSWORD=example
DB_DATABASE=db
SESSION_DRIVER=cookie
TZ=UTC
```

### React Web App

```env
APP_PORT=5173
APP_HOST=0.0.0.0
VITE_API_URL=https://api.mindboard.local
```

---

## Development Notes

* **Monorepo structure**: Shared utilities and types are placed in common workspaces, allowing both the frontend and backend to consume them.
* **Authentication**: Simple session-based authentication via AdonisJS.
* **UI**: Built with React + Vite for fast dev server and HMR.
* **API**: REST endpoints exposed from AdonisJS, connected to PostgreSQL.

---

## Experience & Technical Choices

**CoreBackend**
* **Core backend Application** run with AdonisJS follow the hexagonal architecture respecting SRP, DIP concepts, clean layering and easy integration
* **Authentication**: Simple session-based authentication via AdonisJS.
* **API**: REST endpoints exposed from AdonisJS, connected to PostgreSQL, using Lucid ORM.

**WebApplication**
* **web**: Built with React + Vite for fast dev server and HMR.
* **routing**: Tanstack router to manage routing.
* **store**: zuustand +  to store states.
* **components**: Shadcn for easy component implementation business + TanstackForm

**Package**
* **types**: Shared dto and type + validator across the repository
* **sdk**: TypeSafe sdk with built-in route builder to type afe routing
---

Repository try to keep clean separation of concerns, due to lack of time during this week some features are not finished
if you want additional content, they will be held to the develop branch

incoming feature

### todo for personal purpose

[] ProductQueryFilter working on variants too
  - objectif dashboard will be hable to be sorted by total stock or price avg or higest  lowes

[] Fix Pagination navigation
  - weird bug on it

[] Product page
  - add creation from front-end of products

[] Product history
  - implements charts on stocks

[] Order simulation
  - to have fake realtime using hoppermq events

## Quick Start

One-liner setup (after installing dependencies):

```bash
./init-dev.sh && pnpm install && pnpm c:u -d
```

admin user and seeding can be done once app is running (more production like):

```bash
docker exec -it mindboard-apps-1 sh -c "cd apps/core && node ace register:admin admin@mondboard.local password"
docker exec -it mindboard-apps-1 sh -c "cd apps/core && node ace db:seed"  
```
---
