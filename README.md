# Household Scheduler

A web application to manage flatmate tasks and weekly schedules. Built with Next.js and SQLite, and fully containerized with Docker.

## Features
- Monthly calendar view grouped by weeks.
- Weekly task assignment for flatmates.
- Persistent SQLite database using Docker bind mounts.

## Prerequisites
- Docker and Docker Compose
- Node.js and pnpm (for local script execution)

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Start the application using Docker:
   ```bash
   docker compose up -d --build
   ```

The application will be available at `http://localhost:3400`.

3. Install local dependencies:
   ```bash
   pnpm install
   ```

## Database Seeding
Before using the application, you need to populate the database with your initial data.

1. Open `src/db/seed.ts` in your text editor.
2. Modify the file with your own data (users, tasks, etc.).
3. Run the seed script (this will write to the local `./db` folder which is synchronized with the container):
   ```bash
   pnpm db:seed
   ```

## Development

To stop the container:
```bash
docker compose down
```

To reset the database, simply delete the `scheduler.db` file inside the `db` folder and run the seed script again.

## Tech Stack
- **Frontend & API:** Next.js (App Router), React, TypeScript
- **Database:** SQLite (better-sqlite3)
- **Infrastructure:** Docker, Docker Compose
- **Package Manager:** pnpm