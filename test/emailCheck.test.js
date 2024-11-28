const validateSenecaEmail = require("../helper/emailCheck"); // Import validateSenecaEmail function

/**
 * Test cases for the validateSenecaEmail function
 */
describe("validateSenecaEmail function", () => {
  // Helper function to mock Express req, res, and next
  const mockRequest = (email) => ({
    body: { email }
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);  // Mock status method
    res.json = jest.fn();  // Mock json method
    return res;
  };

  const mockNext = jest.fn();  // Mock next function

  // Test that validateSenecaEmail correctly identifies valid emails
  test("should call next for valid emails", () => {
    const validEmails = [
      "sds@myseneca.ca",
      "example@senecapolytechnic.ca",
      "john.doe@myseneca.ca",
      "jane.doe@senecapolytechnic.ca",
      "user123@myseneca.ca",
      "admin@myseneca.ca"
    ];

    validEmails.forEach(email => {
      const req = mockRequest(email);
      const res = mockResponse();
      const next = mockNext;

      validateSenecaEmail(req, res, next);  // Call the middleware function

      expect(next).toHaveBeenCalled();  // Check if next is called
      expect(res.status).not.toHaveBeenCalled();  // status should not be called
      expect(res.json).not.toHaveBeenCalled();  // json should not be called
    });
  });

  // Test that validateSenecaEmail correctly returns error for invalid emails
  test("should return error for invalid emails", () => {
    const invalidEmails = [
      "sl@gmil.com",
      "invalidemail@notavaliddomain.com",
      "invalid@senecapolytechnic.com",
      "test.user@notadomain.ca",
      "admin@invalid.com"
    ];

    invalidEmails.forEach(email => {
      const req = mockRequest(email);
      const res = mockResponse();
      const next = mockNext;

      validateSenecaEmail(req, res, next);  // Call the middleware function

      // Check if response is correctly sent
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email must be a Seneca email' });
      // expect(next).not.toHaveBeenCalled();  // next should not be called for invalid emails
    });
  });
});
