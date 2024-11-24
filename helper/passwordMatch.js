const bcrypt = require("bcryptjs");
const crypto = require("crypto");

/**
 * Hash the password if both passwords match.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {string|Error} - Hashed password or error
 */
function hashPassword(password, confirmPassword) {
  /**
   * Using crypto library to hash the passowrd for comparison
   */
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");
  const hashedConfirmPassword = crypto
    .createHash("sha512")
    .update(confirmPassword)
    .digest("hex");

  // comparing both hashesh
  const bufferA = Buffer.from(hashedPassword);
  const bufferB = Buffer.from(hashedConfirmPassword);

  if (!crypto.timingSafeEqual(bufferA, bufferB))
    throw new Error("Passwords do not match");

  const regex = /^.{8,20}$/;

  if (!regex.test(password))
    throw new Error("Password must be between 8 and 20 characters");

  return bcrypt.hashSync(password, 12); // Synchronous hash
}

module.exports = { hashPassword };
