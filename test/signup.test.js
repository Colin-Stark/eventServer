const request = require('supertest'); /** Using supertest to assert */
const { app, startServer } = require('../index'); // Import app and startServer

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
