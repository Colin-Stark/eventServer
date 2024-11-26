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

  // Validate password length
  const passwordLengthRegex = /^.{8,20}$/;
  if (!passwordLengthRegex.test(password)) {
    throw new Error('Password must be between 8 and 20 characters');
  }

  // Validate password complexity
  const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).+$/;
  if (!passwordComplexityRegex.test(password)) {
    throw new Error('Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character');
  }

  const newPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS));

  return newPassword;
}

module.exports = { hashPassword };