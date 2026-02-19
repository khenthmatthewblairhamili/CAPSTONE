# Maintenance Request Application - Setup and Run Guide

## Prerequisites

### Required Software

1. **Node.js** (v16 or higher)

   - Download: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)

   - Verify installation: `npm --version`

3. **Git** (for version control)

   - Download: https://git-scm.com/
   - Verify installation: `git --version`

4. **SQLite3** (for database management)

   - Windows: Download from https://www.sqlite.org/download.html
   - macOS: Pre-installed or use `brew install sqlite3`
   - Linux: `sudo apt-get install sqlite3`
   - Verify installation: `sqlite3 --version`

5. **Expo Go App** (on your mobile device)
   - iOS: Download from App Store
   - Android: Download from Google Play Store

### Recommended VS Code Extensions

```
qwtel.sqlite-viewer          # SQLite database viewer
ms-mssql.mssql              # SQL Server tools (already installed)
```

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Ronelmelendrez/maintenance_request_app.git
cd maintenance_request_app
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Initialize Database

The database will be created automatically when you first run the backend server. The database file will be located at:

```
backend/maintenance.db
```

---

## Running the Application

### Option 1: Run Both Frontend and Backend Together

**Terminal 1 - Start Backend Server:**

```bash
cd backend
npm start
```

Backend will run on: `http://localhost:5000`

**Terminal 2 - Start Frontend (Expo):**

```bash
npm start
```

or

```bash
npx expo start
```

### Option 2: Run with Development Scripts

**Backend:**

```bash
cd backend
npm run dev    # Runs with nodemon for auto-restart
```

**Frontend:**

```bash
npm start      # Starts Expo development server
```

---

## Accessing the Application

### Mobile Device (Recommended)

1. Make sure your mobile device is on the same WiFi network as your computer
2. Open Expo Go app on your device
3. Scan the QR code displayed in the terminal
4. The app will load on your device

### Android Emulator

```bash
npx expo start --android
```

### iOS Simulator (macOS only)

```bash
npx expo start --ios
```

### Web Browser

```bash
npx expo start --web
```

---

## View Database Tables

### Method 1: VS Code Extension (Recommended)

1. **Install SQLite Viewer Extension:**

   - Open VS Code
   - Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS)
   - Search for "SQLite Viewer" by `qwtel`
   - Click Install

2. **View Tables:**
   - Navigate to `backend/maintenance.db` in VS Code Explorer
   - Click on the file
   - Tables will display in a visual grid view
   - You can browse, search, and sort data

### Method 2: SQLite Command Line

**View All Tables:**

```bash
cd backend
sqlite3 maintenance.db ".tables"
```

**View Table Schema:**

```bash
sqlite3 maintenance.db ".schema users"
sqlite3 maintenance.db ".schema requests"
sqlite3 maintenance.db ".schema messages"
sqlite3 maintenance.db ".schema notifications"
```

**View Table Data:**

```bash
# View all users
sqlite3 maintenance.db "SELECT * FROM users;"

# View all requests
sqlite3 maintenance.db "SELECT * FROM requests;"

# View all messages
sqlite3 maintenance.db "SELECT * FROM messages;"

# View all notifications
sqlite3 maintenance.db "SELECT * FROM notifications;"
```

**Pretty Print Format:**

```bash
sqlite3 maintenance.db
.mode column
.headers on
SELECT * FROM users;
SELECT * FROM requests;
SELECT * FROM messages;
SELECT * FROM notifications;
.quit
```

### Method 3: DB Browser for SQLite (GUI Tool)

1. Download: https://sqlitebrowser.org/
2. Install and open DB Browser for SQLite
3. Click "Open Database"
4. Navigate to `backend/maintenance.db`
5. Browse tables visually with full CRUD operations

---

## Database Schema

### Tables Overview

#### 1. **users**

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  role TEXT DEFAULT 'homeowner',
  profile_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. **requests**

```sql
CREATE TABLE requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  homeowner_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  technician_id INTEGER,
  images TEXT,
  created_at DATETIME DEFAULT (datetime('now', 'localtime')),
  updated_at DATETIME DEFAULT (datetime('now', 'localtime')),
  FOREIGN KEY (homeowner_id) REFERENCES users(id),
  FOREIGN KEY (technician_id) REFERENCES users(id)
);
```

#### 3. **messages**

```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id INTEGER NOT NULL,
  sender_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT (datetime('now', 'localtime')),
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id)
);
```

#### 4. **notifications**

```sql
CREATE TABLE notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  request_id INTEGER,
  is_read INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT (datetime('now', 'localtime')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
);
```

---

## Default Test Accounts

### Admin Account

```
Email: admin@example.com
Password: admin123
Role: admin
```

### Homeowner Account

```
Email: homeowner@example.com
Password: homeowner123
Role: homeowner
```

**Note:** These accounts are created automatically when you first run the backend server.

---

## Environment Configuration

### Frontend Configuration

File: `src/config/environment.ts`

```typescript
export const API_BASE_URL = "http://192.168.1.100:5000/api";
```

**Important:** Update the IP address to match your computer's local IP:

- Windows: Run `ipconfig` and look for IPv4 Address
- macOS/Linux: Run `ifconfig` or `ip addr show`

### Backend Configuration

File: `backend/src/config/database.js`

```javascript
const dbPath = path.join(__dirname, "../../maintenance.db");
```

---

## Project Structure

```
maintenance_request/
├── app/                          # Expo app screens
├── assets/                       # Images, fonts, icons
├── components/                   # Reusable UI components
├── src/
│   ├── config/                  # Environment configuration
│   ├── screens/                 # Main app screens
│   │   ├── admin/              # Admin dashboard & pages
│   │   └── homeowner/          # Homeowner screens & pages
│   └── services/               # API services
│       ├── api.ts              # Base API client
│       ├── authService.ts      # Authentication
│       ├── requestService.ts   # Maintenance requests
│       ├── messageService.ts   # Chat messages
│       └── notificationService.ts # Notifications
├── backend/
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Auth & validation
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   └── config/            # Database config
│   ├── maintenance.db         # SQLite database (auto-generated)
│   ├── package.json
│   └── server.js              # Express server
├── package.json
├── app.json
├── tsconfig.json
├── API_DOCUMENTATION.md        # Complete API reference
└── SETUP_AND_RUN.md           # This file
```

---

## API Documentation

For detailed API endpoints, request/response formats, and authentication details, see:

- **File:** `backend/API_DOCUMENTATION.md`
- **Base URL:** `http://localhost:5000/api`

---

## Common Commands

### Frontend Commands

```bash
npm start              # Start Expo development server
npm run android        # Run on Android emulator
npm run ios           # Run on iOS simulator
npm run web           # Run in web browser
npx expo start --clear # Clear cache and start
```

### Backend Commands

```bash
npm start             # Start backend server
npm run dev          # Start with nodemon (auto-restart)
```

### Database Commands

```bash
# View tables
sqlite3 backend/maintenance.db ".tables"

# View schema
sqlite3 backend/maintenance.db ".schema"

# Interactive mode
sqlite3 backend/maintenance.db

# Backup database
sqlite3 backend/maintenance.db ".backup backup.db"

# Restore database
sqlite3 backend/maintenance.db ".restore backup.db"
```

### Git Commands

```bash
git status                    # Check current changes
git add .                     # Stage all changes
git commit -m "message"       # Commit changes
git push origin main         # Push to GitHub
git pull origin main         # Pull latest changes
```

---

## Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000    # Windows
lsof -i :5000                   # macOS/Linux

# Kill process using port 5000
taskkill /PID <PID> /F          # Windows
kill -9 <PID>                   # macOS/Linux
```

### Frontend can't connect to backend

1. Check if backend is running on `http://localhost:5000`
2. Update `src/config/environment.ts` with correct IP address
3. Ensure your device is on the same WiFi network
4. Disable firewall temporarily to test connection

### Database errors

```bash
# Reset database (WARNING: deletes all data)
cd backend
rm maintenance.db
npm start    # Database will be recreated
```

### Expo cache issues

```bash
npx expo start --clear
rm -rf node_modules
npm install
```

---

## Features

### For Homeowners

- ✅ Create maintenance requests
- ✅ Upload images with requests
- ✅ Track request status (pending, in-progress, completed)
- ✅ Real-time chat with admin
- ✅ Receive notifications for updates
- ✅ View request history
- ✅ Update profile

### For Admins

- ✅ View all maintenance requests
- ✅ Dashboard with statistics (dynamic date ranges: 1d, 3d, 7d, 30d)
- ✅ Assign technicians to requests
- ✅ Update request status and priority
- ✅ Real-time chat with homeowners
- ✅ Send notifications
- ✅ Filter requests by status
- ✅ Weekly progress charts

### System Features

- ✅ Auto-refresh (30-second polling for messages and notifications)
- ✅ Local timezone support
- ✅ Relative time formatting (X mins/hrs/days ago)
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ SQLite database
- ✅ RESTful API

---

## Technology Stack

### Frontend

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage

### Backend

- Node.js
- Express.js
- SQLite3
- JWT Authentication
- bcrypt for password hashing

### Database

- SQLite3 (File-based, no separate server needed)

---

## Next Steps

1. ✅ Install all prerequisites
2. ✅ Clone and install dependencies
3. ✅ Start backend server
4. ✅ Start frontend app
5. ✅ Install SQLite Viewer extension
6. ✅ Login with test accounts
7. ✅ Test creating requests and sending messages
8. ✅ View database tables

---

## Support

For issues or questions:

- Check `backend/API_DOCUMENTATION.md` for API details
- Review error messages in terminal
- Check browser/device console for frontend errors
- Verify database contents using SQLite Viewer

---

## License

This project is for educational purposes.
