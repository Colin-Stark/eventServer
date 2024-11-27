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

  // Validate password complexity with individual checks
  if (!/[a-z]/.test(password)) {
    throw new Error('Password must include at least one lowercase letter');
  }

  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must include at least one uppercase letter');
  }

  if (!/\d/.test(password)) {
    throw new Error('Password must include at least one digit');
  }

  if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(password)) {
    throw new Error('Password must include at least one special character');
  }

  const newPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS));

  return newPassword;
}

module.exports = { hashPassword };