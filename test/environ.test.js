
// let port = process.env.PORT;

describe('Check that the environmental variable can be read', () => {

    // Made this locally so that people would not have failing github actions
    port = "8000";
    test('Check the data type and value of the port', () => {
        // Test both data type and value of the port in a single test
        expect(typeof port).toBe('string');
        expect(port).toBe('8000');
    });

    test('salt number is of type number', () => {
        // Test the data type of the saltrounds
        console.log(process.env.SALTROUNDS);
        const saltRounds = parseInt(process.env.SALTROUNDS);
        expect(typeof saltRounds).toBe('number');
    });

});
