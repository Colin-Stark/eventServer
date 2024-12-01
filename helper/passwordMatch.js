const bcrypt = require('bcryptjs');

/**
 * Hash the password if both passwords match.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {string|Error} - Hashed password or error
 */
const hashPasswordMiddleware = async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
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
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  if (password.length > 20) {
    return res.status(400).json({ error: 'Password must be at most 20 characters long' });
  }

  if (!hasUpperCase) {
    return res.status(400).json({ error: 'Password must include at least one uppercase letter' });
  }

  if (!hasLowerCase) {
    return res.status(400).json({ error: 'Password must include at least one lowercase letter' });
  }

  if (!hasNumber) {
    return res.status(400).json({ error: 'Password must include at least one digit' });
  }

  if (!hasSpecialChar) {
    return res.status(400).json({ error: 'Password must include at least one special character' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS));
    req.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error hashing password' });
  }
};

module.exports = { hashPasswordMiddleware };