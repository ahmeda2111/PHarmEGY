export const STAFF_ROLES = ["admin", "assistant_admin", "employee"];

export function isStaffRole(role) {
  return STAFF_ROLES.includes(String(role || "").trim().toLowerCase());
}
