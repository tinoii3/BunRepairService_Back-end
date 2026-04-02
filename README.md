## BunRepairService Back-end

Backend API for the Bun Repair Service app, built with **Bun + Elysia** and **Prisma + PostgreSQL**.

### Project description
This service powers a repair-shop workflow: manage users (admin/engineer), devices, departments/sections, and **repair records** end-to-end—from job intake, assignment/status updates, and payment collection to **income reporting** and a simple **dashboard** summary.

### Tech stack
- **Runtime**: Bun
- **Web framework**: Elysia
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT (Bearer token)

### Requirements
- **Bun** installed (`bun --version`)
- **PostgreSQL** running (local or remote)

### Quick start
Install dependencies:

```bash
bun install
```

Create a `.env` file (see below), then apply database migrations:

```bash
bunx prisma generate
bunx prisma migrate deploy
```

Run the API in dev mode (watch):

```bash
bun run dev
```

The server listens on **`http://localhost:3001`**.

### Environment variables
Create a `.env` file in the project root (it is ignored by git).

- **`DATABASE_URL`**: PostgreSQL connection string used by Prisma

### Scripts
Defined in `package.json`:
- **`bun run dev`**: run server with watch (`src/index.ts`)

### API overview
Base URL: **`/api`**

#### Health
- **GET `/`**: returns `"Hello Elysia"`

#### Auth
- **POST `/api/user/signin`**: sign in and receive `{ user, token }`
- **Authorization header**: `Authorization: Bearer <token>`

#### Users
- **GET `/api/user/list`**
- **POST `/api/user/create`**
- **PUT `/api/user/update`** (updates current user using JWT)
- **PUT `/api/user/updateUser/:id`**
- **DELETE `/api/user/remove/:id`**
- **GET `/api/user/list/engineers`**

#### Devices
- **GET `/api/device/list`**
- **POST `/api/device/create`**
- **PUT `/api/device/update/:id`**
- **DELETE `/api/device/remove/:id`**

#### Departments / Sections
- **GET `/api/department/list`**
- **GET `/api/section/listByDepartment/:departmentId`**

#### Repair records
- **GET `/api/repairRecord/list`**
- **POST `/api/repairRecord/create`**
- **PUT `/api/repairRecord/update/:id`**
- **DELETE `/api/repairRecord/remove/:id`**
- **PUT `/api/repairRecord/updateStatus/:id`**
- **PUT `/api/repairRecord/receive`**
- **GET `/api/income/report/:startDate/:endDate`**
- **GET `/api/repairRecord/dashboard?year=YYYY&month=M`**

#### Company
- **GET `/api/company/info`** (requires `Authorization: Bearer <token>`)
- **PUT `/api/company/update`**

### Project structure
- **`src/index.ts`**: Elysia app + route registration
- **`src/controllers/*.ts`**: request handlers (Prisma queries)
- **`prisma/schema.prisma`**: database schema
- **`prisma/migrations/`**: migration history
