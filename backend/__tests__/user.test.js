// const mongoose = require('mongoose');
// const request = require('supertest');
// const User = require('../databasee/model/userschema');
// const app = require('../node');

// const data = [
//     {
//         email: 'bek',
//         password: 'svdfdfgdcd',
//     },
//     {
//         email: 'boldoo',
//         password: 'svdfdsfgss',
//     },
//     {
//         email: 'dulmaa',
//         password: 'svdfdfgdcd',
//     },
//     {
//         email: 'bataa',
//         password: '12345678',
//     },
// ];

// const setUpEnvironment = async () => {
//     await mongoose.connect('mongodb+srv://Tengis:Qweasdzxc2007@cluster0.rqv9oyq.mongodb.net/tester');
//     console.log('user test connected');
//     data.map(async (el) => {
//         await User.create(el);
//     });
// };

// beforeAll(async () => {
//     await setUpEnvironment();
// });

// describe('User test', () => {
//     jest.setTimeout(10000);
//     it('User CREATE test expect to success', async () => {
//         const result = await request(app).post('/user').send({
//             email: 'babvhj@gmail.com',
//             password: '12345jkh678',
//         });
//         expect(result.text).toBe('Successfully created new user!');
//     });
//     it('User LOGIN test expect to success', async () => {
//         const result = await request(app).post('/login').send({
//             email: 'babvhj@gmail.com',
//             password: '12345jkh678',
//         });
//         console.log(result.text, 'log');
//         expect(result.text).toBe('sus');
//     });
//     it('User GET test expect to success', async () => {
//         const result = await request(app).get('/user');
//         expect(result.status).toBe(200);
//     });
//     it('User UPDATE test expect to success', async () => {
//         const userId = '63e0d477dd00feeb24fb3119';
//         const result = await request(app).put(`/user/${userId}`).send({
//             email: 'asdsasssas',
//             password: 'svdssfdssfgss',
//         });
//         expect(result.status).toBe(200);
//     });
//     it('User DELETE test expect to success', async () => {
//         const userId = '63e0d477dd00feeb24fb311a';
//         const result = await request(app).delete(`/user/${userId}`);
//         expect(result.status).toBe(201);
//     });
// });

// afterAll(async () => {
//     await User.deleteMany();
//     await mongoose.connection.close();
// });
