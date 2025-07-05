# جامعة الحاضرة - نظام تنزيل المواد

This is a university course download system built with Node.js, Express, and SQLite.


## Features

- Student course download/enrollment
- Admin management of courses, students, and departments
- Prerequisites management
- Enrollment tracking
- Course completion tracking

## Getting Started

### Login Credentials

#### Admin
- Username: admin
- Password: admin123

### Database

The SQLite database is stored in the `.data` directory for persistence on Glitch.

### API Endpoints

#### Authentication
- POST `/api/login` - Login with username and password

#### Admin Routes
- GET `/api/admin/students` - Get all students
- GET `/api/admin/courses` - Get all courses
- GET `/api/admin/departments` - Get all departments
- POST `/api/admin/students` - Add a new student
- POST `/api/admin/courses` - Add a new course
- POST `/api/admin/departments` - Add a new department
- GET `/api/admin/course/:id` - Get course details
- GET `/api/admin/course/:id/students` - Get students enrolled in a course

#### Student Routes
- GET `/api/student/courses` - Get available courses for a student
- POST `/api/student/enroll` - Enroll in a course
- GET `/api/student/enrollments` - Get student's enrollments
- GET `/api/student/enrollment-count` - Get student's enrollment count

## Development

To run the project locally:

```bash
npm install
npm start
```

The server will start on port 3000 by default, or the port specified in the `PORT` environment variable.

