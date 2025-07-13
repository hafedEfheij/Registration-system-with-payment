# University Course Registration System
## منظومة تنزيل المواد والدفع - جامعة الحاضرة

A comprehensive university course registration system built with Node.js, Express, and SQLite. This system allows students to register for courses, make payments using prepaid cards, and provides administrative tools for managing the entire process.

## Features

### 🎓 Student Features
- **Course Registration**: Browse and register for available courses
- **Payment System**: Submit payment receipts using prepaid card numbers
- **Account Management**: View enrollment history and payment status
- **Security**: Account lockout protection against fraudulent activities

### 👨‍💼 Admin Features
- **Student Management**: Add, edit, and manage student records
- **Course Management**: Create and manage courses, departments, and prerequisites
- **Payment Oversight**: Monitor all payment transactions
- **System Settings**: Configure registration limits and system parameters

### 💰 Financial Supervisor Features
- **Payment Verification**: Validate and process student payments
- **Account Recovery**: Unlock student accounts that have been locked
- **Financial Reports**: View payment statistics and reports

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: SQLite3 (file-based, no external database required)
- **Frontend**: HTML5, CSS3, JavaScript with Bootstrap RTL
- **Authentication**: Session-based with role management
- **UI**: Arabic RTL support with responsive design

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Local Development
1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and go to `http://localhost:3000`

## Default Login Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`

### Financial Supervisor Account
- **Username**: `financial`
- **Password**: `financial123`

### Test Student Account
- **Username**: `student1`
- **Password**: `student123`

## Database Structure

The system uses SQLite with the following main tables:
- `users` - Authentication and user roles
- `students` - Student information and account status
- `departments` - Academic departments
- `courses` - Course catalog with pricing
- `enrollments` - Student course registrations
- `prepaid_cards` - Payment card management
- `receipt_numbers` - Payment tracking

## Security Features

- **Login Rate Limiting**: Prevents brute force attacks
- **Account Lockout**: Automatic lockout after failed payment attempts
- **Session Management**: Secure session handling with auto-logout
- **Role-Based Access**: Different permissions for students, admins, and supervisors

## Deployment

This application is designed to work on various hosting platforms:
- Railway (recommended for free hosting)
- Heroku
- Glitch
- Any Node.js hosting service

The SQLite database is automatically created and initialized on first run.

## File Structure

```
├── index.js              # Application entry point
├── server/
│   ├── server.js         # Main server logic and routes
│   └── database.js       # Database setup and initialization
├── public/               # Static files (HTML, CSS, JS)
│   ├── index.html       # Login page
│   ├── admin/           # Admin interface pages
│   ├── student/         # Student interface pages
│   ├── css/             # Stylesheets
│   └── js/              # Client-side JavaScript
└── package.json         # Project dependencies
```

## Contributing

This is an educational project for university course management. Feel free to fork and modify according to your institution's needs.

## License

This project is open source and available under the MIT License.

---

**جامعة الحاضرة - University Registration System**
*Built with ❤️ for educational purposes*
