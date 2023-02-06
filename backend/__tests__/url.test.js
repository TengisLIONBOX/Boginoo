const mongoose = require('mongoose');
const request = require('supertest');
const Url = require('../databasee/model/urlschema');
const app = require('../node');

const data = [
    {
        userId: '7867865487878',
        origUrl: 'https://www.youtube.com/mes',
    },
    {
        userId: '7867868733878',
        origUrl: 'https://www.youtube.com/cts',
    },
    {
        userId: '78678683337878',
        origUrl: 'https://www.youtube.com/gremix',
    },
];

const setUpEnvironment = async () => {
    await mongoose.connect('mongodb+srv://Tengis:Qweasdzxc2007@cluster0.rqv9oyq.mongodb.net/tester');
    console.log('user test connected');
    data.map(async (el) => {
        await Url.create(el);
    });
};

beforeAll(async () => {
    await setUpEnvironment();
});

describe('Url test', () => {
    jest.setTimeout(8000);
    it('Url CREATE test expect to success', async () => {
        const result = await request(app).post('/url').send({
            userId: '78678687878',
            origUrl: 'https://www.youtube.com/gremix',
        });
        expect(result.status).toBe(201);
    });
});

afterAll(async () => {
    await Url.deleteMany();
    await mongoose.connection.close();
});
