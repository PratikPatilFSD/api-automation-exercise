# Exercise 6 - API Automation and DB Seeding

## Project Overview

This project implements API Automation Testing and Database Seeding for the Roles-Institutes Backend System using industry-standard testing practices.

The automation framework is built using:

- Jest
- Supertest
- Node.js
- PostgreSQL

The project covers:

- Authentication APIs
- User APIs
- Institute APIs
- Role APIs
- Mapping APIs
- Security Testing
- Database Seeding

---

# Tech Stack

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

## Testing Framework
- Jest
- Supertest

## Utilities
- dotenv
- bcrypt
- jsonwebtoken

---

# Project Structure

```txt
roles-institutes-api/
│
├── src/
│   ├── config/
│   ├── middlewares/
│   ├── modules/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── auth/
│   ├── user/
│   ├── institute/
│   ├── role/
│   ├── mapping/
│   ├── security/
│   ├── helpers/
│   └── setup.js
│
├── seed/
│   ├── seed.js
│   ├── users.seed.js
│   ├── institutes.seed.js
│   ├── roles.seed.js
│   └── mappings.seed.js
│
├── .env
├── jest.config.js
├── package.json
└── README.md
```

---

# Environment Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create `.env` file in project root:

```env
PORT=5000

JWT_SECRET=mysupersecretkey

DATABASE_URL=postgres://postgres:password@localhost:5432/scos_db
```

---

# Database Setup

## Start PostgreSQL

Ensure PostgreSQL server is running.

---

## Create Database

```sql
CREATE DATABASE scos_db;
```

---

# Database Seeding

## What is DB Seeding?

DB Seeding is the process of automatically inserting predefined data into the database.

Seed data includes:

- Users
- Roles
- Institutes
- Mappings

This helps create:
- stable test environments
- reusable setups
- automated project initialization

---

# Run Database Seeder

```bash
npm run seed
```

---

# Seeder Features

## Users Seeder
- Inserts default users
- Updates existing users using `ON CONFLICT DO UPDATE`

## Institutes Seeder
- Inserts institute master data
- Updates subtype, logo, and location automatically

## Roles Seeder
- Inserts default system roles
- Updates role descriptions automatically

## Mappings Seeder
- Inserts user-role-institute mappings
- Prevents duplicate mappings

---

# Unique Constraints Added

## Users

```sql
UNIQUE(email)
```

## Institutes

```sql
UNIQUE(code)
```

## Roles

```sql
UNIQUE(code)
```

## Mappings

```sql
UNIQUE(
  tenant_id,
  institute_id,
  user_id,
  role_id
)
```

---

# API Automation

API automation is implemented using:
- Jest
- Supertest

---

# Run All Tests

```bash
npm test
```

---

# Run Module-wise Tests

## Auth Module

```bash
npx jest tests/auth/auth.test.js --runInBand
```

---

## User Module

```bash
npx jest tests/user/user.test.js --runInBand
```

---

## Institute Module

```bash
npx jest tests/institute/institute.test.js --runInBand
```

---

## Role Module

```bash
npx jest tests/role/role.test.js --runInBand
```

---

## Mapping Module

```bash
npx jest tests/mapping/mapping.test.js --runInBand
```

---

## Security Module

```bash
npx jest tests/security/security.test.js --runInBand
```

---

# Modules Covered

## Authentication Module
- Login
- Invalid credentials
- Context selection
- Token validation
- Logout
- Profile APIs

---

## User Module
- Create user
- Duplicate validation
- Invalid input validation
- Get users
- Unauthorized access

---

## Institute Module
- Create institute
- Duplicate institute validation
- Invalid institute data
- Get institutes
- Authorization checks

---

## Role Module
- Create role
- Duplicate role validation
- Invalid role validation
- Get roles

---

## Mapping Module
- Create mapping
- Invalid mapping validation
- Duplicate mapping checks
- Multiple institute mappings
- Multiple role mappings

---

## Security Module
- Missing token
- Invalid token
- Expired token
- Tampered token
- SQL Injection testing
- XSS testing
- Large payload testing
- Sensitive data exposure validation

---

# Security Testing Highlights

The framework validates:

- JWT token security
- Authorization handling
- SQL injection protection
- XSS payload rejection
- Password hash protection
- Large payload handling

---

# Coverage

The automation framework includes:
- Positive test cases
- Negative test cases
- Validation testing
- Security testing
- Authorization testing

---

# Professional Features Implemented

- Modular test structure
- Reusable helper functions
- Token management utilities
- Database seeding
- Environment configuration
- Professional folder architecture
- Constraint-based DB integrity
- Clean automation setup

---

# Expected Seeder Output

```txt
Starting DB seeding...

Users seeded successfully
Roles seeded successfully
Institutes seeded successfully
Mappings seeded successfully

DB seeding completed successfully
```

---

# Expected Test Output

```txt
PASS tests/auth/auth.test.js
PASS tests/user/user.test.js
PASS tests/institute/institute.test.js
PASS tests/role/role.test.js
PASS tests/mapping/mapping.test.js
PASS tests/security/security.test.js
```

---

# Conclusion

This exercise demonstrates:

- Enterprise-level API automation
- Database seeding
- Secure API testing
- Modular backend testing architecture
- Stable and reusable automation workflows

The project follows professional backend automation practices used in real-world software development environments.
