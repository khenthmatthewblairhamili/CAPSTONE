# Maintenance Request System - Getting Started

Complete guide to set up and run the maintenance request application with backend API.

---

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (for React Native)
- **Git**

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ronelmelendrez/maintenance_request_app.git
cd maintenance_request_app
```

### 2. Install Frontend Dependencies

```bash
npm install
# or
yarn install
```

Install AsyncStorage for authentication:

```bash
npm install @react-native-async-storage/async-storage
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

---

## Database Setup

### 1. Create Database Tables

```bash
cd backend
npm run migrate
```

This creates the following tables:

- `users` - Admin and homeowner accounts
- `maintenance_requests` - Service requests
- `messages` - Chat messages for requests
- `notifications` - User notifications

### 2. Seed Sample Data

```bash
npm run seed
```

This creates:

- **Admin account**: `admin@camella.com` / `password123`
- **Homeowner account**: `homeowner@camella.com` / `password123`
- Sample maintenance requests with different statuses
- Sample messages and notifications

---

## Running the Application

### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: **http://localhost:3000**

**API Endpoints:**

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Create account
- `GET /api/requests` - Get all requests
- `POST /api/requests` - Create request
- `POST /api/messages` - Send message
- `GET /api/notifications` - Get notifications

### Terminal 2 - Start React Native App

```bash
# From project root
npx expo start
```

**Options:**

- Press `a` - Open on Android emulator
- Press `i` - Open on iOS simulator
- Press `w` - Open in web browser
- Scan QR code with Expo Go app on physical device

---

## Default Test Accounts

### Admin Account

- **Email**: `admin@camella.com`
- **Password**: `password123`
- **Role**: Property Manager
- **Access**: View all requests, assign technicians, manage status

### Homeowner Account

- **Email**: `homeowner@camella.com`
- **Password**: `password123`
- **Role**: Homeowner
- **Access**: Submit requests, view own requests, chat with admin

---

## Project Structure

```
maintenance_request_app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Login & signup forms
│   │   ├── common/         # Buttons, inputs, navigation
│   │   ├── admin/          # Admin-specific components
│   │   └── homeowner/      # Homeowner-specific components
│   ├── screens/            # Main screen components
│   │   ├── admin/          # Admin dashboard & pages
│   │   └── homeowner/      # Homeowner dashboard & pages
│   ├── services/           # API integration layer
│   │   ├── api.ts          # HTTP client
│   │   ├── authService.ts  # Authentication
│   │   ├── requestService.ts # Maintenance requests
│   │   ├── messageService.ts # Chat messaging
│   │   └── notificationService.ts # Notifications
│   ├── config/             # Theme and configuration
│   └── types/              # TypeScript types
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & validation
│   │   └── database/       # DB connection & migrations
│   └── package.json
└── package.json
```

---

## Features

### For Homeowners 🏠

- ✅ Submit maintenance requests (Plumbing, Electrical, HVAC, etc.)
- ✅ Track request status (Pending → In Progress → Completed)
- ✅ Chat with admin for in-progress requests
- ✅ View notifications
- ✅ Edit profile information

### For Admins 👨‍💼

- ✅ View all maintenance requests
- ✅ Assign technicians to pending requests
- ✅ Set priority levels (High, Medium, Low)
- ✅ Mark requests as completed
- ✅ Chat with homeowners
- ✅ View statistics dashboard
- ✅ Manage notifications

---

## Configuration

### Backend Environment Variables

Edit `backend/.env`:

```env
PORT=3000
NODE_ENV=development
DB_PATH=./src/database/maintenance.db
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### Frontend API Configuration

Edit `src/services/api.ts` if backend is on different host:

```typescript
const API_BASE_URL = "http://localhost:3000/api";
// For physical device, use your computer's IP:
// const API_BASE_URL = 'http://192.168.1.100:3000/api';
```

---

## Troubleshooting

### Backend won't start

- Check if port 3000 is already in use
- Ensure database migration ran successfully
- Check `.env` file exists in backend folder

### Frontend can't connect to backend

- Verify backend is running on port 3000
- If using physical device, update API_BASE_URL with your computer's IP
- Check firewall settings

### Login fails

- Ensure backend is running
- Verify database was seeded with test accounts
- Check network connection between frontend and backend

### AsyncStorage error

- Install package: `npm install @react-native-async-storage/async-storage`
- Restart Expo development server

---

## Development Workflow

1. **Start Backend First**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**

   ```bash
   npx expo start
   ```

3. **Make Changes**

   - Frontend changes hot reload automatically
   - Backend changes reload with nodemon

4. **Test Features**
   - Login as admin or homeowner
   - Create requests, assign technicians, send messages
   - Test all CRUD operations

---

## API Testing

Use tools like Postman or curl to test API endpoints:

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@camella.com","password":"password123"}'

# Get requests (requires token)
curl http://localhost:3000/api/requests \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Building for Production

### Frontend

```bash
# Android
npx expo build:android

# iOS
npx expo build:ios
```

### Backend

```bash
cd backend
npm start
```

Set `NODE_ENV=production` in backend `.env` file.

---

## Support

For issues or questions:

- Check the [GitHub Issues](https://github.com/Ronelmelendrez/maintenance_request_app/issues)
- Review backend API documentation in `backend/README.md`
- Check database schema in `backend/src/database/migrate.js`

---

## License

MIT
