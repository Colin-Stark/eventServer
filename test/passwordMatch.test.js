const { hashPassword } = require("../helper/passwordMatch"); // Path to the hashPassword function
const bcrypt = require("bcryptjs");

/**
 * Test suite for the `hashPassword` function
 */
describe("hashPassword function", () => {
  /**
   * Test case to check if the password gets hashed when passwords match.
   * @returns {void}
   */
  test("should hash the password when passwords match", () => {
    const password = "mySecurePassword";
    const confirmPassword = "mySecurePassword";

    const hashedPassword = hashPassword(password, confirmPassword);

    // Ensure the hashed password is not the same as the original password
    expect(hashedPassword).not.toBe(password);

    // Ensure the hashed password is a valid bcrypt hash
    expect(bcrypt.compareSync(password, hashedPassword)).toBe(true);
  });

  /**
   * Test case to check if the function throws an error when passwords do not match.
   * @returns {void}
   */
  test("should throw an error when passwords do not match", () => {
    const password = "mySecurePassword";
    const confirmPassword = "anotherPassword";

    // Expect error to be thrown due to password mismatch
    expect(() => {
      hashPassword(password, confirmPassword);
    }).toThrow("Passwords do not match");
  });

  /**
   * Test case to check if the function throws an error when passwords are empty.
   * @returns {void}
   */
  test("should throw an error if passwords are empty", () => {
    const password = "";
    const confirmPassword = "";

    // Expect error to be thrown due to password mismatch (both are empty)
    expect(() => {
      hashPassword(password, confirmPassword);
    }).toThrow("Password must be between 8 and 20 characters");
  });

  /**
   * Test case to check if the function throws an error when passwords do not match in length.
   * @returns {void}
   */
  test("should throw an error if passwords do not match in length", () => {
    const password = "short";
    const confirmPassword = "longerPassword";

    // Expect error to be thrown due to password mismatch (different lengths)
    expect(() => {
      hashPassword(password, confirmPassword);
    }).toThrow("Passwords do not match");
  });
});
