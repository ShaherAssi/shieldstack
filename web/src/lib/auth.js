const TOKEN_KEY = 'shieldstack_token'

export function getToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated() {
  return Boolean(getToken())
}

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
  return window.atob(padded)
}

export function getTokenPayload() {
  const token = getToken()
  if (!token) return null

  const parts = token.split('.')
  if (parts.length !== 3) return null

  try {
    const json = decodeBase64Url(parts[1])
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function hasRole(roleName) {
  const payload = getTokenPayload()
  if (!payload || !Array.isArray(payload.roles)) {
    return false
  }
  return payload.roles.includes(roleName)
}

export function isAdmin() {
  return hasRole('ADMIN')
}

export function getUserEmail() {
  const payload = getTokenPayload()
  if (!payload || typeof payload.sub !== 'string') {
    return ''
  }
  return payload.sub
}

export function getUserRoles() {
  const payload = getTokenPayload()
  if (!payload || !Array.isArray(payload.roles)) {
    return []
  }
  return payload.roles
}

