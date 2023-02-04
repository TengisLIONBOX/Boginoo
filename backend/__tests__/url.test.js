const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../node');

const data = [
    {
        email: 'asdasda',
        password: 'svdfdfgdcd',
    },
    {
        email: 'asdass',
        password: 'svdfdfgdcd',
    },
    {
        email: 'asdasdasdf',
        password: 'svdfdfgdcd',
    },
];

const setUpEnvironment = async () => {
    await mongoose.createConnection('mongodb+srv://Tengis:Qweasdzxc2007@cluster0.rqv9oyq.mongodb.net/test');

    console.log('test base connected');
    // await User.deleteMany();
    // data.map(async (el) => {
    //     await User.create(el);
    // });
};

beforeAll(async () => {
    await setUpEnvironment();
});

describe('Url test', () => {
    jest.setTimeout(10000);
    it('New url create test expect to success', async () => {
        const result = await request(app).post('/url').send({
            userId: '7867867878',
            origUrl: 'https://www.youtube.com/',
        });
        expect(result.status).toBe(201);
    });
    // it('User login test expect to success', async () => {
    //     const result = await request(app).post('/login').send({
    //         email: 'asdaas',
    //         password: 'svdfdsfgss',
    //     });
    //     expect(result.status).toBe(201);
    // });
});

afterAll(async () => {
    // await User.deleteMany();
    await mongoose.connection.close();
});
