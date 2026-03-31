-- Local development login seed user for frontend testing.
-- Password hash generated using Spring BCryptPasswordEncoder.
INSERT INTO users (email, password_hash)
VALUES (
  'dev.admin@shieldstack.local',
  '$2a$10$SrTBhKty5JJ2t7IRaoL.9un.Vdc8Eu/niorCC00PZXUIfjyiNVQNu'
)
ON CONFLICT (email) DO NOTHING;

-- Grant ADMIN role in DemoOrg to the local dev user (idempotent).
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'ADMIN'
JOIN organizations o ON o.id = r.org_id AND o.name = 'DemoOrg'
WHERE u.email = 'dev.admin@shieldstack.local'
ON CONFLICT DO NOTHING;
