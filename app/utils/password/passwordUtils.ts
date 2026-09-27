export const checkPasswordValidity = (
  password: string
) => ({
  isLengthValid: password.length >= 8,
  isUpperValid: /[A-Z]/.test(password),
  isNumberValid: /\d/.test(password),
  isSymbolValid: /[^A-Za-z0-9]/.test(password),
});
