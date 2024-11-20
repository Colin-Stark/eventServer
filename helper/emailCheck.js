/**
 * Write a regular expression checking function that will pass the following conditions:
 * 1. The email should contain an @ sign
 * 2. The email should contain a dot(.)
 * 3. The email should either end with '@myseneca.ca' or '@senecapolytechnic.ca'
 * 4. if the email ends with '@senecapolytechnic.ca' then before the @ there shoul be a dot(.) in between the characters e.g xxx.xxx@senecapolytechnic.ca
 * 5. something like this should not pass xxx..xxx@senecapolytechnic.ca. It should only have one
 *
 * @param {string} email - The email address to validate. Useful for testing
 * @returns {boolean} - Returns true if the email meets all the specified conditions, otherwise returns false.
 */
function emailCheck(email) {
  // Check if email contains @ sign and at least one dot
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    return false;
  }

  // Split the email into local part and domain part
  const [localPart, domain] = email.split("@");

  // Ensure the email ends with the correct domain
  if (domain !== "myseneca.ca" && domain !== "senecapolytechnic.ca") {
    return false;
  }

  // Check for mysenca.ca domain (local part cannot contain a dot)
  if (domain === "myseneca.ca" && localPart.indexOf(".") !== -1) {
    return false; // Reject if local part contains a dot for mysenca.ca
  }

  // Check if the domain is 'senecapolytechnic.ca'
  if (domain === "senecapolytechnic.ca") {
    // Ensure local part contains at least one dot and not multiple dots
    if (localPart.indexOf(".") === -1 || localPart.split(".").length > 2) {
      return false;
    }
  }

  // If all conditions are satisfied, return true
  return true;
}

module.exports = emailCheck;
