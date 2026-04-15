-- Seed some example permissions
INSERT INTO permissions (code) VALUES
  ('user:read'),
  ('user:update'),
  ('project:read'),
  ('apikey:rotate')
ON CONFLICT DO NOTHING;

-- Seed example org
INSERT INTO organizations (name) VALUES ('DemoOrg')
ON CONFLICT DO NOTHING;

-- Seed example role
INSERT INTO roles (org_id, name)
SELECT id, 'ADMIN' FROM organizations WHERE name = 'DemoOrg'
ON CONFLICT DO NOTHING;

-- Map ADMIN -> all permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON 1=1
WHERE r.name = 'ADMIN'
ON CONFLICT DO NOTHING;
