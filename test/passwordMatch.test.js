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
  test("should hash the password when passwords match", async () => {
    const password = "mySecurePassword@1";
    const confirmPassword = "mySecurePassword@1";

    const hashedPassword = await hashPassword(password, confirmPassword);

    // Ensure the hashed password is not the same as the original password
    expect(hashedPassword).not.toBe(password);

    // Ensure the hashed password is a valid bcrypt hash
    expect(bcrypt.compareSync(password, hashedPassword)).toBe(true);
  });

  /**
   * Test case to check if the function throws an error when passwords do not match.
   * @returns {void}
   */
  test("should throw an error when passwords do not match", async () => {
    const password = "mySecurePassword";
    const confirmPassword = "anotherPassword";

    // Expect error to be thrown due to password mismatch

    await expect(hashPassword(password, confirmPassword)).rejects.toThrow("Passwords do not match");
  });

  /**
   * Test case to check if the function throws an error when passwords are empty.
   * @returns {void}
   */
  test("should throw an error if passwords are empty", async () => {
    const password = "";
    const confirmPassword = "";

    // Expect error to be thrown due to password mismatch (both are empty)
    await expect(hashPassword(password, confirmPassword)).rejects.toThrow("Password must be between 8 and 20 characters");
  });

  test("should throw an error if password length of short than 8", async () => {
    const password = "hi";
    const confirmPassword = "hi";

    await expect(hashPassword(password, confirmPassword)).rejects.toThrow("Password must be between 8 and 20 characters");
  });

  /**
   * Test case to check if the function throws an error when passwords do not match in length.
   * @returns {void}
   */
  test("should throw an error if passwords do not match in length", async () => {
    const password = "short";
    const confirmPassword = "longerPassword";

    // Expect error to be thrown due to password mismatch (different lengths)
    await expect(hashPassword(password, confirmPassword)).rejects.toThrow("Passwords do not match");
  });

  /**
   * Test case to check if the function throws an error when password doesn't contain uppercase letter.
   * @returns {void}
   */
  test("should throw an error if password does not contain an uppercase letter", async () => {
    const password = "lowercase1@";
    const confirmPassword = "lowercase1@";

    await expect(hashPassword(password, confirmPassword)).rejects.toThrow("Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character");
  });

  /**
   * Test case to check if the function throws an error when password doesn't contain lowercase letter.
   * @returns {void}
   */
  test("should throw an error if password does not contain a lowercase letter", async () => {
    const password = "UPPERCASE1@";
    const confirmPassword = "UPPERCASE1@";

    await expect(hashPassword(password, confirmPassword)).rejects.toThrow("Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character");
  });

  /**
   * Test case to check if the function throws an error when password doesn't have digit.
   * @returns {void}
   */
  test("should throw an error if password does not contain a digit", async () => {
    const password = "NoDigit@";
    const confirmPassword = "NoDigit@";

    await expect(hashPassword(password, confirmPassword)).rejects.toThrow("Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character");
  });

  /**
   * Test case to check if the function throws an error when password doesn't contain a special character.
   * @returns {void}
   */
  test("should throw an error if password does not contain a special character", async () => {
    const password = "NoSpecial1";
    const confirmPassword = "NoSpecial1";

    await expect(hashPassword(password, confirmPassword)).rejects.toThrow("Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character");
  });
});
