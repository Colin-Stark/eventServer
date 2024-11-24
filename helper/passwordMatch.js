const bcrypt = require("bcryptjs");

/**
 * Hash the password if both passwords match.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {string|Error} - Hashed password or error
 */
async function hashPassword(password, confirmPassword) {
  const result = await comparePasswords(password, confirmPassword);
  if (!result) {
    throw new Error("Passwords do not match");
  }

  const regex = /^.{8,20}$/;

  if (!regex.test(password))
    throw new Error("Password must be between 8 and 20 characters");

  return bcrypt.hashSync(password, 12); // Synchronous hash
}

async function comparePasswords(password, confirmPassword) {
  let hashedPassword = await bcrypt.hash(password, 10);

  return bcrypt.compare(confirmPassword, hashedPassword);
}

module.exports = { hashPassword };
