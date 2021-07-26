const supertest = require('supertest');
const mongoose = require('mongoose');
const { sha512 } = require('crypto-hash');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = require('../app');
const Barks = require('../models/Bark');
const Users = require('../models/User');
const Tokens = require('../models/Token');

describe('Test Routes for indexRouter', function () {
    beforeEach(async () => {
        await mongoose.connect(process.env.TEST_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
    });

    test('GET /barks', async () => {
        const hashedPassword = await sha512('password');
        const user = await Users.create({
            username: 'testuser',
            fullName: 'Test User',
            email: 'test.user@test.com',
            phoneNumber: '000-000-0000',
            password: hashedPassword,
        });
        const bark1 = await Barks.create({
            author: user.username,
            content: 'Bark 1',
        });
        const bark2 = await Barks.create({
            author: user.username,
            content: 'Bark 2',
        });

        await supertest(app)
            .get('/barks')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.ArrayContaining([
                        expect.ObjectContaining(bark1),
                        expect.ObjectContaining(bark2),
                    ])
                );
            });
    });

    test('GET /barks/:id', async () => {
        const hashedPassword = await sha512('password');
        const user = await Users.create({
            username: 'testuser',
            fullName: 'Test User',
            email: 'test.user@test.com',
            phoneNumber: '000-000-0000',
            password: hashedPassword,
        });
        const bark = await Barks.create({
            author: user.username,
            content: 'Bark 1',
        });

        await supertest(app)
            .get(`/barks/${bark.id}`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        _id: expect.any(String),
                        author: user.username,
                        content: 'Bark 1',
                    })
                );
            });
    });

    test('POST /barks/create', async () => {
        const hashedPassword = await sha512('password');
        const user = await Users.create({
            username: 'testuser',
            fullName: 'Test User',
            email: 'test.user@test.com',
            phoneNumber: '000-000-0000',
            password: hashedPassword,
        });
        const token = await Tokens.create({
            user: user.id,
            token: await sha512(`${uuidv4()}${user.username}`),
            expires: null,
        });

        await supertest(app)
            .post('/barks/create')
            .send({
                content: 'Bark 1',
                token: token.token,
            })
            .expect(200)
            .then(async (response) => {
                const bark = await Barks.findOne({ author: user.username });
                expect(bark).toEqual(
                    expect.objectContaining({
                        author: user.username,
                        content: 'Bark 1',
                    })
                );
            });
    });
    test('DELETE /barks/:id/delete', async () => {
        const hashedPassword = await sha512('password');
        const user = await Users.create({
            username: 'testuser',
            fullName: 'Test User',
            email: 'test.user@test.com',
            phoneNumber: '000-000-0000',
            password: hashedPassword,
        });
        const bark = await Barks.create({
            author: user.username,
            content: 'Bark 1',
        });
        const token = await Tokens.create({
            user: user.id,
            token: await sha512(`${uuidv4()}${user.username}`),
            expires: null,
        });

        await supertest(app)
            .delete(`/barks/${bark.id}/delete?token=${token.token}`)
            .expect(200)
            .then(async (response) => {
                const dbBark = await Barks.findById(bark.id);
                expect(dbBark).toEqual(
                    expect.objectContaining({ deleted: true })
                );
            });
    });

    afterEach(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });
});
