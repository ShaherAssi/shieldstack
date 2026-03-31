-- Create the user_roles join table
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);

-- Ensure a USER role exists in the DemoOrg (to assign by default on signup)
INSERT INTO roles (org_id, name)
SELECT o.id, 'USER'
FROM organizations o
WHERE o.name = 'DemoOrg'
  AND NOT EXISTS (
      SELECT 1 FROM roles r WHERE r.name = 'USER' AND r.org_id = o.id
  );
