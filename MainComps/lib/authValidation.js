export function normalizeName(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function normalizePhone(value) {
  let digits = String(value || "").replace(/\D/g, "");

  if (digits.startsWith("20") && digits.length === 12) {
    digits = `0${digits.slice(2)}`;
  }

  return digits;
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
}

export function isValidPhone(value) {
  return /^01[0125][0-9]{8}$/.test(normalizePhone(value));
}

export function validateName(value) {
  const name = normalizeName(value);

  if (!name) return "Enter your full name.";
  if (name.length < 3) return "Full name must be at least 3 characters.";
  if (name.length > 80) return "Full name is too long.";
  if (/\d/.test(name)) return "Full name cannot contain numbers.";
  if (!/^[\p{L}][\p{L} .'-]*[\p{L}]$/u.test(name) && !/^[\p{L}]$/u.test(name)) {
    return "Full name can only contain letters and spaces.";
  }

  return "";
}

export function validateEmail(value) {
  const email = normalizeEmail(value);

  if (!email) return "Enter your email.";
  if (!isEmail(email)) return "Enter a valid email address.";

  return "";
}

export function validatePhone(value) {
  const raw = String(value || "");

  if (!raw.trim()) return "Enter your phone number.";
  if (/[^\d+\s-]/.test(raw)) return "Phone number can only contain digits.";
  if (!isValidPhone(raw)) {
    return "Enter a valid Egyptian mobile number, like 01012345678.";
  }

  return "";
}

export function validatePassword(value) {
  const password = String(value || "");

  if (!password) return "Enter a password.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[a-z]/.test(password)) {
    return "Password must include a lowercase letter.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include an uppercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must include a number.";
  }

  return "";
}

export function validateLoginIdentifier(value) {
  const identifier = String(value || "").trim();

  if (!identifier) return "Enter your email or phone number.";

  if (identifier.includes("@")) {
    return validateEmail(identifier);
  }

  if (/[A-Za-z]/.test(identifier)) {
    return "Use a valid email, or a phone number with digits only.";
  }

  return validatePhone(identifier);
}

export function validateSignup({ fullName, phone, email, password, confirmPassword }) {
  return {
    fullName: validateName(fullName),
    phone: validatePhone(phone),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword:
      password !== confirmPassword ? "Passwords do not match." : "",
  };
}
