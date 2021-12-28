const mongoose  = require('mongoose');
const request   = require('supertest');
const app       = require('../../app');

const url =
  'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';

beforeAll( async () => {
  await mongoose.connect(url);
});

afterAll( async () => {
  await mongoose.connection.close();
});

describe('POST requests to /records with', () => {
  describe('given startDate, endDate, minCount and maxCount', () => {
    const requestPayload = {
      startDate: "2017-01-27",
      endDate: "2021-07-12",
      minCount: 300,
      maxCount: 2000
    }

    test('should respond with a 200 status code', async () => {
      const response = await request(app)
        .post('/api/v1/records')
        .send(requestPayload)
  
      expect(response.statusCode).toBe(200);
    });
  
    test('should specify json in the content type header', async () => {
      const response = await request(app)
        .post('/api/v1/records')
        .send(requestPayload)
  
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  
    test('should have code, msg, and records keys in the response payload', async () => {
      const response = await request(app)
        .post('/api/v1/records')
        .send(requestPayload)
  
      expect(response.body.code).toEqual(0);
      expect(response.body.msg).toEqual('success');
      expect(response.body.records).toEqual(
        expect.arrayContaining([     
          expect.objectContaining({   
            key: "TAKwGc6Jr4i8Z487",
            createdAt: "2017-01-28T01:22:14.398Z",
            totalCount: 310             
          })
        ])
      );
    });
  });

  describe('any missing key', () => {
    const requestPayload = {
      startDate: "2017-01-27",
      endDate: "2021-07-12",
      minCount: 300
    }

    test('should respond with a 400 status code', async () => {
      const response = await request(app)
        .post('/api/v1/records')
        .send(requestPayload)
  
      expect(response.statusCode).toBe(400);
    });

    test('should specify json in the content type header', async () => {
      const response = await request(app)
        .post('/api/v1/records')
        .send(requestPayload)
  
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('should have code and msg keys in the response payload', async () => {
      const response = await request(app)
        .post('/api/v1/records')
        .send(requestPayload)
  
      expect(response.body.code).toEqual('1');
      expect(response.body.msg).toBeDefined();
    });
  });
});

describe('Any requests except POST /records', () => {
  test('should respond with a 404 status code', async () => {
    const response = await request(app)
      .post('/not-defined')

    expect(response.statusCode).toBe(404);
  });

  test('should specify json in the content type header', async () => {
    const response = await request(app)
      .post('/not-defined')

    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });

  test('should have code and msg keys in the response payload', async () => {
    const response = await request(app)
      .post('/not-defined')

    expect(response.body.code).toEqual('1');
    expect(response.body.msg).toBeDefined();
  });
});