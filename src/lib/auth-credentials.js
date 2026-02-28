// Test account credentials for development/testing
export const TEST_ACCOUNTS = {
  student: [
    {
      id: 'STU001',
      email: 'student@school.edu',
      password: 'student123',
      name: 'Juan Santos',
      role: 'student',
      section: '11-A',
    },
    {
      id: 'STU002',
      email: 'test.student@school.edu',
      password: 'password123',
      name: 'Maria Cruz',
      role: 'student',
      section: '12-B',
    },
  ],
  teacher: [
    {
      id: 'TEACH001',
      email: 'teacher@school.edu',
      password: 'teacher123',
      name: 'Prof. Ramon Garcia',
      role: 'teacher',
      department: 'Math',
    },
    {
      id: 'TEACH002',
      email: 'test.teacher@school.edu',
      password: 'password123',
      name: 'Prof. Anna Reyes',
      role: 'teacher',
      department: 'English',
    },
  ],
  admin: [
    {
      id: 'ADMIN001',
      email: 'admin@school.edu',
      password: 'admin123',
      name: 'Admin Account',
      role: 'admin',
      department: 'Administration',
    },
    {
      id: 'ADMIN002',
      email: 'test.admin@school.edu',
      password: 'password123',
      name: 'Registrar Officer',
      role: 'admin',
      department: 'Registrar',
    },
  ],
}

export const findUserByEmail = (email, role) => {
  const accounts = TEST_ACCOUNTS[role]
  if (!accounts) return null
  return accounts.find((account) => account.email === email)
}

export const validateCredentials = (email, password, role) => {
  const user = findUserByEmail(email, role)
  if (!user) return null
  if (user.password !== password) return null
  // don't return the password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}
