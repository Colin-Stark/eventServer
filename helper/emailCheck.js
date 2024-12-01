/**
 * Function to check if email is valid
 * 
 * @param {email} - email to be checked 
 * @returns {boolean} - true if email is valid, false otherwise
 */
function validateSenecaEmail(req, res, next) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    if (!email.endsWith('@myseneca.ca') && !email.endsWith('@senecapolytechnic.ca')) {
        return res.status(400).json({ error: 'Email must be a Seneca email' });
    }
    next();
}

module.exports = validateSenecaEmail;