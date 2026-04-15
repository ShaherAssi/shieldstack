import { useCallback, useEffect, useState } from 'react'
import { getUsers, createUser } from '../lib/api.js'
import { isAdmin } from '../lib/auth.js'

function UsersPage() {
  const admin = isAdmin()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [submitting, setSubmitting] = useState(false)
  const [createMessage, setCreateMessage] = useState('')
  const [createError, setCreateError] = useState('')

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getUsers()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('You are not allowed to view users.')
      } else {
        setError('Failed to load users. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  async function handleCreateUser(e) {
    e.preventDefault()
    setCreateMessage('')
    setCreateError('')

    if (!email.trim() || !password.trim()) {
      setCreateError('Email and password are required.')
      return
    }

    setSubmitting(true)
    try {
      await createUser({
        email: email.trim(),
        password,
        roles: role ? [role] : [],
      })
      setCreateMessage('User created successfully.')
      setEmail('')
      setPassword('')
      setRole('USER')
      await loadUsers()
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setCreateError('You are not allowed to create users.')
      } else if (err.response && typeof err.response.data === 'string') {
        setCreateError(err.response.data)
      } else {
        setCreateError('Failed to create user. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    loadUsers().catch(() => {})
  }, [loadUsers])

  return (
    <section className="panel">
      <h2 className="page-title">Users</h2>
      <p className="muted-text">
        Create users and view the user list from the ShieldStack backend.
      </p>

      <section className="card">
        <h3>Create User</h3>
        {admin ? (
          <form onSubmit={handleCreateUser}>
            <div className="form-grid">
              <label className="form-label">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                />
              </label>
              <label className="form-label">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                />
              </label>
              <label className="form-label">
                Role
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </label>
              <button type="submit" disabled={submitting} className="btn btn-primary">
                {submitting ? 'Creating...' : 'Create user'}
              </button>
            </div>
            {createMessage && (
              <p className="alert alert-success">{createMessage}</p>
            )}
            {createError && (
              <p className="alert alert-error">{createError}</p>
            )}
          </form>
        ) : (
          <p className="alert alert-info">Only admins can create users.</p>
        )}
      </section>

      {loading && <p className="muted-text">Loading users...</p>}

      {!loading && error && (
        <p className="alert alert-error">{error}</p>
      )}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.createdAt || '-'}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default UsersPage

