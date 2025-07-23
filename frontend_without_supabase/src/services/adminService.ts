
export const adminService = {
  // Authenticate admin user
  async authenticateAdmin(username: string, password: string): Promise<AdminUser | null> {
    try {
      // Note: In a real application, you should hash the password before comparing
      // For demo purposes, we'll compare plain text (not recommended for production)
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // User not found
        }
        console.error('Error authenticating admin:', error)
        throw new Error('Authentication failed')
      }

      // In production, you should use proper password hashing (bcrypt, etc.)
      // For demo purposes, assuming password is stored as plain text
      if (data.password_hash === password) {
        return data
      }

      return null
    } catch (error: any) {
      // Handle the case where no rows are returned (user not found)
      if (error.code === 'PGRST116' || error.message?.includes('no rows returned')) {
        return null
      }
      console.error('Error authenticating admin:', error)
      throw new Error('Authentication failed')
    }
  },

  // Create admin user (for setup)
  async createAdmin(username: string, password: string): Promise<AdminUser> {
      .from('admin_users')
      .insert([{
        username,
        password_hash: password // In production, hash this password
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating admin:', error)
      throw new Error('Failed to create admin user')
    }

    return data
  }
}
