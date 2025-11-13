// Auth rules configuration
// Configure allowed student emails via env var (comma-separated)
const allowedList = (import.meta.env.VITE_ALLOWED_STUDENT_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

export const isAllowedStudentEmail = (email) => {
  if (!email) return false;
  const e = String(email).trim().toLowerCase();
  if (allowedList.length === 0) return true; // no restriction configured
  return allowedList.includes(e);
};

// Global flag: never show Google auth
export const showGoogleAuth = false;
