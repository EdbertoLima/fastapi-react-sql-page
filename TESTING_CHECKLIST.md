# Testing Checklist for FastAPI + React + SQLPage Template

Use this checklist to verify all services are working correctly after generating a project.

## 🌐 Service URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend (React) | http://localhost:8000 | ⬜ |
| API Documentation | http://localhost:8000/api/docs | ⬜ |
| Admin Dashboard | http://localhost:8000/admin | ⬜ |
| SQLPage Interface | http://localhost:8000/sqlpage | ⬜ |
| Flower (Task Monitor) | http://localhost:5555 | ⬜ |
| pgAdmin | http://localhost:5050 | ⬜ |

---

## ✅ Test 1: React Frontend

**URL**: http://localhost:8000

**Expected Result**:
- [ ] Page loads successfully
- [ ] See React homepage with Material-UI styling
- [ ] Navigation menu visible
- [ ] No console errors in browser DevTools (F12)

**If fails**: Check `docker-compose logs frontend`

---

## ✅ Test 2: User Authentication

### 2A: Sign Up
1. Navigate to http://localhost:8000
2. Click **"Sign Up"** link
3. Fill form:
   - Email: `test@example.com`
   - First Name: `Test`
   - Last Name: `User`
   - Password: `testpass123`
   - Confirm Password: `testpass123`
4. Submit form

**Expected Result**:
- [ ] Account created successfully
- [ ] Redirected to login or home page
- [ ] No errors displayed

### 2B: Login
1. Navigate to http://localhost:8000/login
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `testpass123`
3. Click **"Login"**

**Expected Result**:
- [ ] Successfully logged in
- [ ] JWT token stored in localStorage (check DevTools > Application > Local Storage)
- [ ] Redirected to protected area
- [ ] See user-specific content

### 2C: Protected Route
1. While logged in, navigate to http://localhost:8000/protected

**Expected Result**:
- [ ] Page loads (should be accessible when authenticated)
- [ ] Shows protected content

2. Logout, then try to access http://localhost:8000/protected

**Expected Result**:
- [ ] Redirected to login page (protected route blocks unauthenticated users)

---

## ✅ Test 3: API Documentation

**URL**: http://localhost:8000/api/docs

**Expected Result**:
- [ ] Swagger UI loads
- [ ] See available endpoints:
  - [ ] `POST /api/token` (Login)
  - [ ] `POST /api/sign-up` (Registration)
  - [ ] `GET /api/v1/users/me` (Current user)
  - [ ] `GET /api/v1/users` (List users)
  - [ ] `POST /api/v1/users` (Create user)
  - [ ] `GET /api/v1/task` (Example Celery task)

### Test API Endpoint:
1. Click on `POST /api/token`
2. Click "Try it out"
3. Enter credentials:
   ```json
   {
     "username": "test@example.com",
     "password": "testpass123"
   }
   ```
4. Click "Execute"

**Expected Result**:
- [ ] Response code: 200
- [ ] Response body contains `access_token` and `token_type`

---

## ✅ Test 4: Admin Dashboard

**URL**: http://localhost:8000/admin

### 4A: Login as Superuser
1. Navigate to http://localhost:8000/admin
2. Login with superuser credentials (from cookiecutter setup):
   - Email: `admin@test-project.com` (or what you entered)
   - Password: `admin123` (or what you entered)

**Expected Result**:
- [ ] Successfully logged into react-admin dashboard
- [ ] See admin interface with Material-UI theme

### 4B: User Management
1. Click on **"Users"** in sidebar
2. Should see list of users

**Expected Result**:
- [ ] User table displays with columns: ID, Email, First Name, Last Name, Status, Role
- [ ] See at least 2 users (superuser + test user you created)
- [ ] Table is sortable and searchable

### 4C: Create User
1. Click **"Create"** button
2. Fill form:
   - Email: `admin-created@example.com`
   - First Name: `Admin`
   - Last Name: `Created`
   - Password: `pass123`
   - Is Active: ✓
   - Is Superuser: (leave unchecked)
3. Click **"Save"**

**Expected Result**:
- [ ] User created successfully
- [ ] Redirected to user list
- [ ] New user appears in the list

### 4D: Edit User
1. Click on any user row
2. Modify a field (e.g., First Name)
3. Click **"Save"**

**Expected Result**:
- [ ] User updated successfully
- [ ] Changes reflected in user list

### 4E: Delete User
1. Click on the user you just created
2. Click **"Delete"** button
3. Confirm deletion

**Expected Result**:
- [ ] User deleted successfully
- [ ] Removed from user list

---

## ✅ Test 5: SQLPage Interface ⭐ (NEW)

**URL**: http://localhost:8000/sqlpage

### 5A: Homepage
**Expected Result**:
- [ ] SQLPage homepage loads
- [ ] See hero section: "Welcome to SQLPage"
- [ ] See two cards:
  - [ ] "Database Info" with link
  - [ ] "Users List" with link
- [ ] Footer shows "Powered by SQLPage"

### 5B: Database Info Page
1. Click **"View Details"** on Database Info card
2. Or navigate to: http://localhost:8000/sqlpage/db-info.sql

**Expected Result**:
- [ ] Page loads successfully
- [ ] See PostgreSQL version
- [ ] See database statistics (name, size, table count)
- [ ] See table "Available Tables" listing all database tables
- [ ] Should show at least `users` table
- [ ] "Back to Home" button works

### 5C: Users List Page
1. Go back to SQLPage home
2. Click **"View Users"** on Users List card
3. Or navigate to: http://localhost:8000/sqlpage/users.sql

**Expected Result**:
- [ ] Page loads successfully
- [ ] See table with all users from database
- [ ] Columns: ID, Email, First Name, Last Name, Status, Role
- [ ] Active users show "✓ Active"
- [ ] Superusers show "⭐ Admin"
- [ ] See statistics cards:
  - [ ] Total Users count
  - [ ] Active Users count
  - [ ] Administrators count
- [ ] Table is sortable and searchable
- [ ] "Back to Home" button works

### 5D: Create Custom SQLPage
1. Create a new file in your project:
   ```bash
   cat > sqlpage/test-page.sql << 'EOF'
   SELECT 'text' as component,
          '# My Test Page' as contents_md,
          'This is a custom SQLPage I created!' as contents;

   SELECT 'card' as component;
   SELECT
       'User Count' as title,
       COUNT(*)::text as description
   FROM users;
   EOF
   ```

2. Navigate to: http://localhost:8000/sqlpage/test-page.sql

**Expected Result**:
- [ ] Custom page loads
- [ ] Shows "My Test Page" heading
- [ ] Shows user count in a card
- [ ] No errors in browser console

---

## ✅ Test 6: Celery Background Tasks

### 6A: Trigger Task via API
1. Navigate to http://localhost:8000/api/docs
2. Find `GET /api/v1/task` endpoint
3. Click "Try it out" > "Execute"

**Expected Result**:
- [ ] Response: `{"message": "success"}`
- [ ] Status code: 200

### 6B: Monitor Task in Flower
1. Navigate to http://localhost:5555
2. Check the **"Tasks"** tab

**Expected Result**:
- [ ] Flower dashboard loads
- [ ] See task `app.tasks.example_task` in the list
- [ ] Task state: SUCCESS
- [ ] Can view task details (args, result, runtime)

---

## ✅ Test 7: pgAdmin ⭐ (NEW)

**URL**: http://localhost:5050

### 7A: Login
1. Navigate to http://localhost:5050
2. Login with credentials from `.env`:
   - Email: `admin@example.com`
   - Password: `changeme`

**Expected Result**:
- [ ] pgAdmin interface loads
- [ ] Successfully logged in

### 7B: Connect to Database
1. Click **"Add New Server"**
2. In **"General"** tab:
   - Name: `My Project DB`
3. In **"Connection"** tab:
   - Host: `postgres`
   - Port: `5432`
   - Maintenance database: `app` (or your DB name)
   - Username: `postgres` (or your postgres_user)
   - Password: `password` (or your postgres_password)
   - Save password: ✓
4. Click **"Save"**

**Expected Result**:
- [ ] Successfully connected to PostgreSQL
- [ ] See database tree in left sidebar
- [ ] Can expand: Databases > app > Schemas > public > Tables
- [ ] See `users` table

### 7C: Query Users Table
1. Right-click on `users` table
2. Select **"View/Edit Data"** > **"All Rows"**

**Expected Result**:
- [ ] Query executes successfully
- [ ] See all users in a grid
- [ ] Can view user data (email, name, is_active, is_superuser)

---

## ✅ Test 8: Docker Services Health

Run these commands to verify all services:

```bash
# Check all containers are running
docker-compose ps

# Expected: All services show "Up" state
```

**Expected Result**:
- [ ] nginx: Up
- [ ] postgres: Up
- [ ] redis: Up
- [ ] backend: Up
- [ ] worker: Up
- [ ] flower: Up
- [ ] frontend: Up
- [ ] sqlpage: Up
- [ ] pgadmin: Up

```bash
# Check database connection from backend
docker-compose exec backend python -c "from app.db.session import SessionLocal; db = SessionLocal(); print('DB Connected:', db.bind.url)"
```

**Expected Result**:
- [ ] Prints database URL without errors

```bash
# Check SQLPage can connect to database
docker-compose logs sqlpage | grep -i "error"
```

**Expected Result**:
- [ ] No error messages (or empty output)

---

## ✅ Test 9: Hot Module Replacement (HMR)

### Frontend HMR
1. Keep browser open at http://localhost:8000
2. Edit `frontend/src/views/Home.tsx`
3. Change some text, save file

**Expected Result**:
- [ ] Browser updates automatically without full page reload
- [ ] Changes appear within 1-2 seconds
- [ ] No console errors

### Backend Hot Reload
1. Edit `backend/app/main.py`
2. Change the root endpoint message
3. Save file

**Expected Result**:
- [ ] Backend container restarts automatically (check logs: `docker-compose logs backend`)
- [ ] API reflects changes at http://localhost:8000/api/v1

---

## ✅ Test 10: Error Handling

### Invalid Login
1. Navigate to http://localhost:8000/login
2. Enter invalid credentials
3. Submit

**Expected Result**:
- [ ] Error message displayed
- [ ] No system crash
- [ ] Can retry login

### API Error
1. Navigate to http://localhost:8000/api/docs
2. Try accessing protected endpoint without authentication
3. Execute `GET /api/v1/users/me` without authorization

**Expected Result**:
- [ ] Response code: 401 Unauthorized
- [ ] Proper error message returned

---

## 📊 Final Checklist Summary

### Critical Services (Must Pass)
- [ ] Frontend loads and works
- [ ] User authentication (signup/login)
- [ ] API documentation accessible
- [ ] Database connection working
- [ ] SQLPage interface loads
- [ ] All Docker containers running

### Additional Services (Should Pass)
- [ ] Admin dashboard functional
- [ ] Celery tasks execute
- [ ] Flower monitors tasks
- [ ] pgAdmin connects to DB
- [ ] Hot reload works

### SQLPage Specific (New Features)
- [ ] SQLPage homepage loads
- [ ] Database info page shows stats
- [ ] Users list displays correctly
- [ ] Can create custom SQL pages
- [ ] No SQLPage errors in logs

---

## 🐛 Troubleshooting

### Frontend shows 502 Bad Gateway
**Solution**: Wait 30-60 seconds for Vite dev server to build
```bash
docker-compose logs frontend
```

### SQLPage not loading
**Solution**: Check SQLPage container logs
```bash
docker-compose logs sqlpage
# Verify DATABASE_URL is correct in .env
```

### Database connection errors
**Solution**: Ensure postgres is ready before backend starts
```bash
docker-compose restart backend
docker-compose exec backend alembic upgrade head
```

### pgAdmin can't connect
**Solution**: Use hostname `postgres` not `localhost`
- Host: `postgres` (Docker service name)
- Port: `5432`

### Port conflicts
**Solution**: Check if ports are already in use
```bash
# Windows
netstat -ano | findstr "8000"
netstat -ano | findstr "5432"

# Linux/Mac
lsof -i :8000
lsof -i :5432
```

---

## ✅ Success Criteria

**Your template is working correctly if**:
- ✅ All 9 services start without errors
- ✅ Can sign up and login users
- ✅ Admin dashboard manages users
- ✅ SQLPage interface displays database data
- ✅ API endpoints respond correctly
- ✅ Background tasks execute via Celery
- ✅ Hot reload works for development

---

## 🎉 Testing Complete!

If all tests pass, your cookiecutter template is ready for:
- ✅ Development use
- ✅ Distribution to other developers
- ✅ Publishing to GitHub
- ✅ Production deployment (with security hardening)

**Next Steps**:
1. Commit your template changes
2. Create a release/tag
3. Update documentation
4. Share with your team!
