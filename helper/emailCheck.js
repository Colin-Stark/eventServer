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
    // // Check if the email ends with @myseneca.ca
    // if (email.endsWith('@myseneca.ca')) {
    //     // Ensure the local part is alphanumeric (i.e., no special characters other than the @)
    //     const localPart = email.split('@')[0]; // Get the part before the '@'
    //     const localPartPattern = /^[a-zA-Z0-9]+$/;

    //     if (!localPartPattern.test(localPart)) {
    //         return false; // If the local part contains invalid characters, return false
    //     }

    //     return true; // If email ends with @myseneca.ca and local part is valid, return true
    // }

    // // Check if the email ends with @senecapolytechnic.ca
    // if (email.endsWith('@senecapolytechnic.ca')) {
    //     // Ensure there is a dot in the local part before the @
    //     const localPart = email.split('@')[0]; // Get the part before the '@'

    //     if (!localPart.includes('.')) {
    //         return false; // If no dot in the local part, return false
    //     }

    //     const localPartPattern = /^[a-zA-Z0-9.]+$/; // Alphanumeric and dots are allowed in the local part
    //     if (!localPartPattern.test(localPart)) {
    //         return false; // If the local part contains invalid characters, return false
    //     }

    //     return true; // If email ends with @senecapolytechnic.ca and local part is valid, return true
    // }

    // // If email doesn't match any of the above cases, return false
    // return false;

    const emailArr = email.split('@'); // split email based on '@'
    const userNameArr = emailArr[0].split('.'); // split email based on '.'
    const localPartPattern = /^[a-zA-Z0-9]+$/;

    // email array must contain 2 elements <user, domain>
    if(emailArr.length === 2) {

        // if domian is .myseneca.ca. and user has no '.'
        if ((emailArr[1] === 'myseneca.ca') && localPartPattern.test(emailArr[0])) {

            return true;
        }

        // if domian is 'senecapolytechnic.ca'
        if (emailArr[1] === 'senecapolytechnic.ca') {

            //user array must contain 2 elements <userFirstname, userlastname>, also check both elements are not empty
            if ((userNameArr.length === 2) && (localPartPattern.test(userNameArr[0]) && localPartPattern.test(userNameArr[1]))) { //
                
                return true;
            }
        }
    }

    return false;
}

module.exports = emailCheck;
