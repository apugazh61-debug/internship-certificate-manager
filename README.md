# Internship Certificate Management App

A comprehensive full-stack application for managing internships, tracking progress, and issuing verifiable digital certificates.

## Features

### Admin Dashboard
- **Intern Management**: Register, view, edit, and delete interns.
- **Attendance Tracking**: Mark daily attendance (Present, Absent, Late).
- **Module Tracking**: Manage learning curriculum and track individual intern progress.
- **Stipend Management**: Record and track monthly stipend payments.
- **Certificate Issuance**: Generate PDF certificates with unique QR codes for graduates.

### Public Verification
- **Digital Verification**: Publicly accessible verification pages (`/verify/[certificate_id]`) to validate the authenticity of certificates via QR code scan.

## Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MySQL (via Sequelize ORM)
- **PDF Generation**: jsPDF
- **QR Code**: qrcode

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Server

### Installation

1.  **Clone the repository** (if applicable) or navigate to project folder.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Create a `.env` file in the root directory with your database credentials:
    ```env
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=internship_db
    JWT_SECRET=your_jwt_secret_key
    ```
    *(Refer to `.env.example` for a template)*

### Database Setup

1.  **Create the Database**: Ensure the database (e.g., `internship_db`) exists in your MySQL server.
2.  **Sync Tables**: Run the sync script to create/update tables:
    ```bash
    npx tsx scripts/sync-db.ts
    ```
    *Alternatively, you can use Sequelize migrations.*

### Running the Application

1.  **Start the development server**:
    ```bash
    npm run dev
    ```
2.  **Access the App**:
    - Admin Dashboard: `http://localhost:3000/login`
    - Public Verification: `http://localhost:3000/verify/[id]`

### Default Credentials (First Run)
If no users exist, the system may fall back to default credentials (check `app/api/auth/login/route.ts` or seed your database):
- **Email**: `admin@example.com`
- **Password**: `password`
*(Change this immediately for production!)*

## Project Structure
- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components.
- `/models`: Sequelize database definitions.
- `/lib`: Utility functions and DB connection.
- `/scripts`: Database maintenance scripts.
