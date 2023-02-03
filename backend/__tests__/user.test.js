const mongoose = require('mongoose');
const request = require('supertest');
const Url = require('../databasee/model/urlschema');
const User = require('../databasee/model/userschema');
const app = require('../node');

const { userPostController } = require('../__controllers__/userController');

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
    await mongoose.createConnection('mongodb+srv://Tengis:Qweasdzxc2007@cluster0.rqv9oyq.mongodb.net/testing');
    console.log('test base connected');
    await User.deleteMany();
    data.map(async (el) => {
        await User.create(el);
    });
};

beforeAll(async () => {
    await setUpEnvironment();
});

describe('User test', () => {
    it('New user create test expect to success', async () => {
        const result = await request(app).post('/user').send({
            email: 'asdasdddscdsdas',
            password: 'svdfdsfgss',
        });
        expect(result.status).toBe(201);
    });
    it('User login test expect to success', async () => {
        const result = await request(app).post('/login').send({
            email: 'asdaas',
            password: 'svdfdsfgss',
        });
        expect(result.status).toBe(201);
    });
});

afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
});
