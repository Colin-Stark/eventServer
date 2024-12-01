const bcrypt = require('bcryptjs');

/**
 * Hash the password if both passwords match.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {string|Error} - Hashed password or error
 */
const hashPassword = async (password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const specialCharacters = "!@#$%^&*";  // Define special characters
  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasNumber = false;
  let hasSpecialChar = false;

  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i);

    if (char >= 'A' && char <= 'Z') {
      hasUpperCase = true;
    } else if (char >= 'a' && char <= 'z') {
      hasLowerCase = true;
    } else if (char >= '0' && char <= '9') {
      hasNumber = true;
    } else if (specialCharacters.includes(char)) {
      hasSpecialChar = true;
    }

    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 8 && password.length <= 20) {
      break;
    }
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  if (password.length > 20) {
    throw new Error('Password must be at most 20 characters long');
  }

  if (!hasUpperCase) {
    throw new Error('Password must include at least one uppercase letter');
  }

  if (!hasLowerCase) {
    throw new Error('Password must include at least one lowercase letter');
  }

  if (!hasNumber) {
    throw new Error('Password must include at least one digit');
  }

  if (!hasSpecialChar) {
    throw new Error('Password must include at least one special character');
  }



  const newPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS));

  return newPassword;
}

module.exports = { hashPassword };