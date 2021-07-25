const mongoose = require('mongoose');
var supertest = require('supertest');
const { sha512 } = require('crypto-hash');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = require('../app');
const Users = require('../models/User');
const Tokens = require('../models/Token');
const ResetRequest = require('../models/ResetRequest');

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
            .set('Accept', 'application/json')
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
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(async (response) => {
                // Make sure that the route generated the token
                const token = await Tokens.findOne({ user: user.id });
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
            user: user.id,
            token: await sha512(`${uuidv4()}${user.username}`),
            expires: null,
        });

        await supertest(app)
            .delete(`/auth/delete-token?token=${token.token}`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(async () => {
                const dbToken = await Tokens.findOne({ token: token.token });
                // Makes sure that the route successfully deleted the token
                expect(dbToken).toEqual(null);
            });
    });

    test('POST /auth/reset-password', async () => {
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
            .post('/auth/reset-password')
            .send({ login: user.username })
            .expect(200)
            .then(async (response) => {
                // Make sure that the route actually created a reset request attached to the user model
                const resetRequest = await ResetRequest.findOne();
                expect(resetRequest.user).toEqual(user.id);
            });
    });

    test('PATCH /auth/reset-password/:resetRequest', async () => {
        const password = 'password';
        const hashedPassword = await sha512(password);
        const user = await Users.create({
            username: 'testuser',
            fullName: 'Test User',
            email: 'test.user@test.com',
            phoneNumber: '000-000-0000',
            password: hashedPassword,
        });
        const resetRequest = await ResetRequest.create({ user: user.id });
        console.log(user.id);
        console.log(resetRequest.id);

        const newPassword = 'password123';
        await supertest(app)
            .patch(`/auth/reset-password/${resetRequest.id}`)
            .send({ password: newPassword })
            .expect(200)
            .then(async (response) => {
                const dbUser = await Users.findById(user.id);

                // Makes sure that the user's password was actually changed
                const newHashedPassword = await sha512(newPassword);
                expect(dbUser).toEqual(
                    expect.objectContaining({
                        password: newHashedPassword,
                    })
                );
            });
    });

    afterEach((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});
