// utils/dateUtils.js

// Format uniquement la date (ex: "26 janvier 2026")
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const dateObj = new Date(dateString);

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
};

// Format uniquement l'heure (ex: "12:05")
export const formatTime = (dateString) => {
  if (!dateString) return '';
  const dateObj = new Date(dateString);

  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

// Format date + heure (ex: "26 janvier 2026 à 12:05")
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const dateObj = new Date(dateString);

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

// Validate email using a practical RFC-like regular expression and length rules
export const isValidEmail = (email) => {
  if (!email) return false;
  if (email.length > 254) return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local] = parts;
  if (local.length > 64) return false;
  const emailRegex = /^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

// Validate international phone numbers (E.164 like) or common national formats.
// Accepts numbers with spaces/dashes/parentheses, or E.164 (+CC...) form.
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const trimmed = phone.trim();
  const e164Regex = /^\+[1-9]\d{1,14}$/; // + followed by country code and up to 15 digits
  if (e164Regex.test(trimmed)) return true;
  // Normalize and accept 7-15 digits for common national formats
  const onlyDigits = trimmed.replace(/\D/g, '');
  return /^\d{7,15}$/.test(onlyDigits);
};
