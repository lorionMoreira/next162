# Defensoria Pública - Next.js Authentication Frontend

A Next.js 16 frontend application with authentication, admin dashboard, and protected client area.

## Features

- **User Authentication**: Login and registration for clients
- **Admin Authentication**: Separate admin login with protected admin dashboard
- **Protected Routes**: Middleware-based route protection
- **Basic Auth**: Connects to external API using Basic Authentication
- **HTTP-only Cookies**: Secure credential storage
- **Modern UI**: Tailwind CSS with responsive design
- **Dark Mode Support**: Automatic dark mode based on system preferences

## Project Structure

```
src/
├── app/
│   ├── api/auth/          # API routes for authentication
│   ├── admin/             # Admin pages (login, dashboard)
│   ├── dashboard/         # Client protected pages
│   ├── login/             # Client login page
│   └── register/          # Registration page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   └── layout/            # Layout components
├── hooks/
│   └── useAuth.ts         # Authentication hook
├── lib/
│   ├── api.ts             # API client configuration
│   └── auth.ts            # Auth helper functions
└── middleware.ts          # Route protection
```

## External API Endpoints

The application connects to: `https://agenda.defensoria.ba.def.br/api/`

| Purpose | Endpoint | Method |
|---------|----------|--------|
| Client Login | `/login` | POST |
| Client Register | `/cadastro-basico` | POST |
| Admin Login | `/admin/login` | POST |

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Routes

### Public Routes
- `/` - Home page
- `/login` - Client login
- `/register` - Client registration
- `/admin/login` - Admin login

### Protected Client Routes
- `/dashboard` - Client dashboard
- `/dashboard/profile` - User profile
- `/dashboard/settings` - User settings

### Protected Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/dashboard/users` - User management
- `/admin/dashboard/reports` - Reports
- `/admin/dashboard/settings` - Admin settings

## Authentication Flow

1. User submits credentials via login form
2. Frontend API route receives credentials
3. API route calls external API with Basic Auth header
4. On success, credentials are stored in HTTP-only cookie
5. Middleware checks for cookie on protected routes
6. Subsequent API calls use stored credentials

## Technologies

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- HTTP-only Cookies for secure auth storage
