const mongoose = require('mongoose');
var supertest = require('supertest');
const { sha512 } = require('crypto-hash');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const app = require('../app');
const Users = require('../models/User');
const Tokens = require('../models/Token');

describe('Test Routes for authRouter', function () {
    beforeEach((done) => {
        mongoose.connect(
            process.env.TEST_CONNECTION_STRING,
            { useUnifiedTopology: true, useNewUrlParser: true },
            done
        );
    });

    test('POST /auth/create-user', async () => {
        const user = {
            username: 'testuser',
            fullName: 'Test User',
            email: 'test.user@test.com',
            phoneNumber: '000-000-0000',
            password: 'password',
        };
        const hashedPassword = await sha512(user.password);

        await supertest(app)
            .post('/auth/create-user')
            .send(user)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                // Makes sure that route returns all of the user information
                expect(response.body).toEqual(
                    expect.objectContaining({
                        ...user,
                        password: hashedPassword,
                    })
                );
            });
    });

    test('POST /auth/generate-token', async () => {
        const password = 'password';
        const hashedPassword = await sha512(password);
        const user = await Users.create({
            username: 'testuser',
            fullName: 'Test User',
            email: 'test.user@test.com',
            phoneNumber: '000-000-0000',
            password: hashedPassword,
        });

        await supertest(app)
            .post('/auth/generate-token')
            .send({
                login: user.username,
                password: password,
                remember: false,
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (response) => {
                const token = await Tokens.findOne({ username: user.username });
                expect(response.body).toEqual(
                    // Makes sure that the route contains a token string
                    expect.objectContaining({
                        token: token.token,
                    })
                );
            });
    });

    test('DELETE /auth/delete-token', async () => {
        const password = 'password';
        const hashedPassword = await sha512(password);
        const user = await Users.create({
            username: 'testuser',
            fullName: 'Test User',
            email: 'test.user@test.com',
            phoneNumber: '000-000-0000',
            password: hashedPassword,
        });
        const token = await Tokens.create({
            username: user.username,
            token: await sha512(`${uuidv4()}${user.username}`),
            expires: null,
        });

        await supertest(app)
            .delete(`/auth/delete-token?token=${token.token}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async () => {
                const dbToken = await Tokens.findOne({ token: token.token });
                // Makes sure that the route successfully deleted the token
                expect(dbToken).toEqual(null);
            });
    });

    afterEach((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});
