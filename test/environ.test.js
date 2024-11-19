
let port = process.env.PORT;
console.log(`port is ${port}`);

describe('Check that the environmental variable can be read', () => {

    test('Check the data type and value of the port', () => {
        // Test both data type and value of the port in a single test
        expect(typeof port).toBe('string');
        expect(port).toBe('80003');
    });
});
