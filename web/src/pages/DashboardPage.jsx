function DashboardPage() {
  return (
    <section className="panel">
      <h2 className="page-title">Dashboard</h2>
      <p className="muted-text">
        Welcome to ShieldStack Admin. You are authenticated and can now manage
        users based on your role permissions.
      </p>
      <div className="stat-grid">
        <article className="stat-card">
          <h3>Authentication</h3>
          <p>JWT login is active</p>
        </article>
        <article className="stat-card">
          <h3>RBAC</h3>
          <p>Role-based access is enforced</p>
        </article>
        <article className="stat-card">
          <h3>User Management</h3>
          <p>View and create users from the Users page</p>
        </article>
      </div>
    </section>
  )
}

export default DashboardPage

