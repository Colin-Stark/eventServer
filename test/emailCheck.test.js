const emailCheck = require("../helper/emailCheck"); // Import emailCheck function

/**
 * Test cases for the emailCheck function
 */
const emails = [
  "sl@gmil.com",            // Invalid email
  "sds@myseneca.ca",        // Valid email
  "example@senecapolytechnic.ca",  // Valid email
  "john.doe@myseneca.ca",   // Valid email
  "invalidemail@notavaliddomain.com", // Invalid email
  "jane.doe@senecapolytechnic.ca", // Valid email
  "user123@myseneca.ca",    // Valid email
  "invalid@senecapolytechnic.com",  // Invalid email
  "test.user@notadomain.ca",  // Invalid email
  "admin@myseneca.ca",      // Valid email
  "admin@invalid.com"       // Invalid email
  // You can add as many as you like for testing
];

describe("emailCheck function", () => {

  // Test that emailCheck correctly identifies valid emails
  test("should return true for valid emails", () => {
    const validEmails = [
      "sds@myseneca.ca",
      "example@senecapolytechnic.ca",
      "john.doe@myseneca.ca",
      "jane.doe@senecapolytechnic.ca",
      "user123@myseneca.ca",
      "admin@myseneca.ca"
    ];

    validEmails.forEach(email => {
      expect(emailCheck(email)).toBe(true);
    });
  });

  // Test that emailCheck correctly identifies invalid emails
  test("should return false for invalid emails", () => {
    const invalidEmails = [
      "sl@gmil.com",
      "invalidemail@notavaliddomain.com",
      "invalid@senecapolytechnic.com",
      "test.user@notadomain.ca",
      "admin@invalid.com"
    ];

    invalidEmails.forEach(email => {
      expect(emailCheck(email)).toBe(false);
    });
  });
});
