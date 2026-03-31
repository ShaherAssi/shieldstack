import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearToken, getUserEmail, getUserRoles } from '../lib/auth.js'

function AppLayout() {
  const navigate = useNavigate()
  const email = getUserEmail()
  const roles = getUserRoles()

  function handleLogout() {
    clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <h1 className="brand">ShieldStack Admin</h1>
          <nav className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              Users
            </NavLink>
          </nav>
        </div>
        <div className="topbar-right">
          <div className="user-context">
            <p className="user-email">{email || 'Unknown user'}</p>
            <div className="role-list">
              {roles.length ? (
                roles.map((role) => (
                  <span key={role} className="role-pill">
                    {role}
                  </span>
                ))
              ) : (
                <span className="role-pill">No roles</span>
              )}
            </div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="page-wrap">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout

