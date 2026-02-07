# Authentication System - Test Accounts

## Overview
This authentication system provides test accounts for development and testing purposes. Three role-based accounts are available: Student, Teacher, and Admin.

## Test Account Credentials

### Student Accounts
| Email | Password | ID | Name | Section |
|-------|----------|----|----|---------|
| student@school.edu | student123 | STU001 | Juan Santos | 11-A |
| test.student@school.edu | password123 | STU002 | Maria Cruz | 12-B |

### Teacher Accounts
| Email | Password | ID | Name | Department |
|-------|----------|----|----|------------|
| teacher@school.edu | teacher123 | TEACH001 | Prof. Ramon Garcia | Math |
| test.teacher@school.edu | password123 | TEACH002 | Prof. Anna Reyes | English |

### Admin Accounts
| Email | Password | ID | Name | Department |
|-------|----------|----|----|------------|
| admin@school.edu | admin123 | ADMIN001 | Admin Account | Administration |
| test.admin@school.edu | password123 | ADMIN002 | Registrar Officer | Registrar |

## Files Created

### 1. Authentication Credentials (`src/lib/auth-credentials.js`)
- Stores all test account credentials
- Functions to validate credentials:
  - `findUserByEmail(email, role)` - Find user by email
  - `validateCredentials(email, password, role)` - Validate login credentials

### 2. Login API Route (`src/app/api/auth/login/route.js`)
- POST endpoint for authentication
- Validates email, password, and role
- Returns user data and token on success
- Returns 401 on invalid credentials

### 3. Logout API Route (`src/app/api/auth/logout/route.js`)
- POST endpoint for logout
- Simple endpoint that can be extended with session cleanup

### 4. Auth Utilities (`src/lib/auth-utils.js`)
Client-side utility functions:
- `getAuthUser()` - Get current authenticated user
- `getUserRole()` - Get user role
- `setAuthUser(user)` - Store user in session
- `clearAuth()` - Clear authentication
- `isAuthenticated()` - Check if user is authenticated

### 5. Auth Info Component (`src/components/auth-info.jsx`)
- Display current user info
- Logout button
- Shows user name and email

### 6. Updated Login Page (`src/app/login/page.js`)
- Validates credentials against test accounts
- Shows error messages on invalid login
- Displays test credentials in UI
- Routes to appropriate dashboard after successful login

## Usage

### Login Flow
1. User selects a role (Student, Teacher, or Admin)
2. Enters email and password
3. System validates credentials via `/api/auth/login`
4. On success, user info is stored in sessionStorage
5. User is redirected to their role-specific dashboard

### Using Auth Info in Components
```jsx
import { AuthInfo } from '@/components/auth-info'

export function Header() {
  return (
    <header>
      <h1>Dashboard</h1>
      <AuthInfo />
    </header>
  )
}
```

### Checking Authentication
```javascript
import { getAuthUser, isAuthenticated } from '@/lib/auth-utils'

// Get current user
const user = getAuthUser()
console.log(user.name, user.email, user.role)

// Check if authenticated
if (isAuthenticated()) {
  // User is logged in
}
```

### Logging Out
```javascript
import { clearAuth } from '@/lib/auth-utils'

function logout() {
  fetch('/api/auth/logout', { method: 'POST' })
  clearAuth()
  router.push('/login')
}
```

## Next Steps for Production

When moving to production, consider:

1. **Database Integration** - Move credentials to a database
2. **Password Hashing** - Use bcrypt or similar for password security
3. **JWT Tokens** - Replace simple tokens with proper JWT implementation
4. **Sessions** - Implement proper session management with cookies
5. **Email Verification** - Add email verification flow
6. **Password Reset** - Add password recovery mechanism
7. **Rate Limiting** - Add rate limiting to login attempts
8. **Audit Logging** - Log login attempts for security monitoring
9. **2FA** - Consider adding two-factor authentication
10. **OAuth Integration** - Consider SSO/OAuth integration

## Testing

Use the provided test accounts to test the authentication flow:

```bash
# Test Student Login
Email: student@school.edu
Password: student123
Role: Student

# Test Teacher Login
Email: teacher@school.edu
Password: teacher123
Role: Teacher

# Test Admin Login
Email: admin@school.edu
Password: admin123
Role: Admin
```

## Troubleshooting

### Login fails even with correct credentials
- Check browser console for error messages
- Ensure you select the correct role
- Verify the email format (case-sensitive)

### User data not persisting
- Check if sessionStorage is enabled in browser
- Clear browser cache and try again

### Logout not working
- Ensure the logout API endpoint is accessible
- Check network tab in DevTools for the logout request
