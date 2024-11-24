/**
 * Function to check if email is valid
 * 
 * @param {email} - email to be checked 
 * @returns {boolean} - true if email is valid, false otherwise
 */
function emailCheck(email) {
    const regex = /^[a-zA-Z0-9.]+@(myseneca|senecapolytechnic)\.ca$/i;
    return regex.test(email);
}

module.exports = emailCheck;
