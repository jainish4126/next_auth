export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters" };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: "Password must contain lowercase letter" };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "Password must contain uppercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Password must contain a number" };
  }
  return { isValid: true, message: "" };
}

export function validateMobile(mobile) {
  return /^\d{10}$/.test(mobile);
}