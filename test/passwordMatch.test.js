const { hashPasswordMiddleware } = require("../helper/passwordMatch"); // Path to the hashPassword function
const bcrypt = require("bcryptjs");

jest.mock("bcryptjs"); // Mock bcrypt module

describe("hashPasswordMiddleware function", () => {
  // Mocking req, res, and next
  const mockRequest = (password, confirmPassword) => ({
    body: { password, confirmPassword },
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); // Mock status method
    res.json = jest.fn(); // Mock json method
    return res;
  };

  const mockNext = jest.fn(); // Mock next function

  /**
   * Test case to check if the password gets hashed when passwords match.
   */
  test("should hash the password when passwords match", async () => {
    const password = "mySecurePassword@1";
    const confirmPassword = "mySecurePassword@1";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    bcrypt.hash.mockResolvedValue("hashedPassword"); // Mock bcrypt.hash

    await hashPasswordMiddleware(req, res, next); // Call the middleware

    // Ensure the hashed password is not the same as the original password
    expect(req.hashedPassword).toBe("hashedPassword");

    // Ensure bcrypt.hash was called with the correct parameters
    expect(bcrypt.hash).toHaveBeenCalledWith(password, expect.any(Number));

    // Ensure next function was called
    expect(next).toHaveBeenCalled();

    // Ensure no errors were returned
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  /**
   * Test case to check if the function throws an error when passwords do not match.
   */
  test("should return error if passwords do not match", async () => {
    const password = "mySecurePassword";
    const confirmPassword = "anotherPassword";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    await hashPasswordMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Passwords do not match" });
  });

  /**
   * Test case to check if the function throws an error when passwords are empty.
   */
  test("should return error if passwords are empty", async () => {
    const password = "";
    const confirmPassword = "";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    await hashPasswordMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password must be at least 8 characters long",
    });
  });

  /**
   * Test case to check if the function throws an error if password length is shorter than 8.
   */
  test("should return error if password length is less than 8", async () => {
    const password = "hi";
    const confirmPassword = "hi";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    await hashPasswordMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password must be at least 8 characters long",
    });
  });

  /**
   * Test case to check if the function throws an error when password length exceeds 20 characters.
   */
  test("should return error if password length is more than 20 characters", async () => {
    const password = "ThisPasswordIsWayTooLong1@";
    const confirmPassword = "ThisPasswordIsWayTooLong1@";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    await hashPasswordMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password must be at most 20 characters long",
    });
  });

  /**
   * Test case to check if the function throws an error when password doesn't contain uppercase letter.
   */
  test("should return error if password does not contain an uppercase letter", async () => {
    const password = "lowercase1@";
    const confirmPassword = "lowercase1@";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    await hashPasswordMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password must include at least one uppercase letter",
    });
  });

  /**
   * Test case to check if the function throws an error when password doesn't contain lowercase letter.
   */
  test("should return error if password does not contain a lowercase letter", async () => {
    const password = "UPPERCASE1@";
    const confirmPassword = "UPPERCASE1@";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    await hashPasswordMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password must include at least one lowercase letter",
    });
  });

  /**
   * Test case to check if the function throws an error when password doesn't contain a digit.
   */
  test("should return error if password does not contain a digit", async () => {
    const password = "NoDigit@";
    const confirmPassword = "NoDigit@";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    await hashPasswordMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password must include at least one digit",
    });
  });

  /**
   * Test case to check if the function throws an error when password doesn't contain special character.
   */
  test("should return error if password does not contain a special character", async () => {
    const password = "NoSpecial1";
    const confirmPassword = "NoSpecial1";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    await hashPasswordMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password must include at least one special character",
    });

  });

  /**
   * Test case to check if an error occurs during password hashing.
   */
  test("should return error if there is an issue hashing the password", async () => {
    const password = "mySecurePassword@1";
    const confirmPassword = "mySecurePassword@1";

    const req = mockRequest(password, confirmPassword);
    const res = mockResponse();
    const next = mockNext;

    bcrypt.hash.mockRejectedValue(new Error("Hashing failed")); // Simulate an error in hashing

    await hashPasswordMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error hashing password",
    });
  });
});