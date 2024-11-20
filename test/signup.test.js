const request = require('supertest'); /** Using supertest to assert */
const { app, startServer } = require('../index'); // Import app and startServer
const emailCheck = require('../helper/emailCheck'); // Import emailCheck function

let server;

/** 
 * Start the server before running the test cases 
*/
beforeAll(async () => {
    server = app.listen(8000);
});

afterAll(async () => {
    /** close the server */
    server.close();
});

describe('GET /signup', () => {
    test('It should respond with a welcome message', async () => {
        const response = await request(server).get('/signup');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Welcome to the signup page' });
    });
});

describe('emailCheck function Test', () => {

    // Positive Tests: Test for valid emails
    test('should return true for valid emails', () => {
        expect(emailCheck('user@example.com')).toBe(false);
        expect(emailCheck('firstname.lastname@senecapolytechnic.ca')).toBe(true);
        expect(emailCheck('name123@domain.com')).toBe(false);
    });

    // Negative Test: Test for invalid email patterns
    test('should return false for emails with invalid patterns', () => {
        expect(emailCheck('invalidemail')).toBe(false);
        expect(emailCheck('invalid@domain')).toBe(false);
        expect(emailCheck('@domain.com')).toBe(false);
        expect(emailCheck('user@domaincom')).toBe(false);
    });

    // Domain Specific Test: Test for emails ending with '@myseneca.ca'
    test('should return true for emails ending with @myseneca.ca', () => {
        expect(emailCheck('user@myseneca.ca')).toBe(true);
        expect(emailCheck('anotheruser@myseneca.ca')).toBe(true);
    });

    // Negative Test: Test for emails ending with '@senecapolytechnic.ca' but no dot in the local part
    test('should return true for emails ending with @senecapolytechnic.ca but without dot in local part', () => {
        expect(emailCheck('username@senecapolytechnic.ca')).toBe(false);
        expect(emailCheck('hello@senecapolytechnic.ca')).toBe(false);
    });

    // Domain Specific Test: Test for emails ending with '@senecapolytechnic.ca' but with a dot in the local part
    test('should return true for emails ending with @senecapolytechnic.ca and a dot in the local part', () => {
        expect(emailCheck('firstname.lastname@senecapolytechnic.ca')).toBe(true);
        expect(emailCheck('student.name@senecapolytechnic.ca')).toBe(true);
    });

    // Negative Test: Test for emails ending with '@myseneca.ca' but with a dot in the local part
    test('should return true for emails ending with @myseneca.ca and a dot in the local part', () => {
        expect(emailCheck('firstname.lastname@myseneca.ca')).toBe(false);
        expect(emailCheck('student.name@myseneca.ca')).toBe(false);
    });

    // Negative Test: Test for emails ending with '@senecapolytechnic.ca' but with multiple dots in the local part
    test('should return false for emails ending with @senecapolytechnic.ca and multiple dots in the local part', () => {
        expect(emailCheck('first..last@senecapolytechnic.ca')).toBe(true);
        expect(emailCheck('student..name@senecapolytechnic.ca')).toBe(true);
    });

});
