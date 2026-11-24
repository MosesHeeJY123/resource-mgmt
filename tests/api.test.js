const request = require('supertest');
const { app, server } = require('../index');

afterAll(() => server.close());

describe('Resource Management API', () => {
    let resourceId;

    it('POST /add-resource should create a resource', async () => {
        // Define the resource object to be sent to the API
        const newResource = {
            name: 'API Test',
            location: 'Loc',
            description: 'Desc',
            owner: 'api@test.com'
        };

        // Send a POST request to /add-resource with the new resource data
        const res = await request(app).post('/add-resource').send(newResource);

        // Verify that the API returned the correct status code
        expect(res.status).toBe(201);

        // Check that the new resource exists in the returned list
        expect(res.body.some(r => r.name === newResource.name)).toBe(true);

        // Store the resource ID for later tests (edit, delete)
        resourceId = res.body[res.body.length - 1].id;
    });
});