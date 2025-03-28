// email format validation
export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// password - minimum 6 characters
export function isValidPassword(password) {
  return password.length >= 6;
}

// field is not empty
export function isEmpty(value) {
  return !value || value.trim() === "";
}

// Exemplo de uso no Login ou Register:
// if (isEmpty(email) || !isValidEmail(email)) alert("Email inválido");