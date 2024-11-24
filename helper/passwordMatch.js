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

  const passwordRegex = /^.{8,20}$/;
  if (!passwordRegex.test(password)) {
    throw new Error('Password must be between 8 and 20 characters');
  }

  console.log(parseInt(process.env.saltRounds));

  const newPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS));

  return newPassword;
}

module.exports = { hashPassword };
