export const STAFF_ROLES = ["admin", "assistant_admin", "employee"];
export const USER_ROLES = ["client", "employee", "assistant_admin", "admin"];

function normalizeRole(role) {
  return String(role || "").trim().toLowerCase();
}

export function isStaffRole(role) {
  return STAFF_ROLES.includes(normalizeRole(role));
}

export function canManageUsers(role) {
  const value = normalizeRole(role);
  return value === "admin" || value === "assistant_admin";
}

export function canAssignRole(actorRole, nextRole) {
  const actor = normalizeRole(actorRole);
  const next = normalizeRole(nextRole);

  if (!USER_ROLES.includes(next)) return false;
  if (actor === "admin") return true;
  if (actor === "assistant_admin") {
    return next === "client" || next === "employee";
  }

  return false;
}
