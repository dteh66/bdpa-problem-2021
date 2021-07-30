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
    var user1, user2, token1, token2;
    beforeEach(async () => {
        await mongoose.connect(process.env.TEST_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        user1 = await Users.create({
            username: 'user1',
            fullName: 'Test User 1',
            email: 'user.1@bark.com',
            phoneNumber: '000-000-0000',
            password: await sha512('password'),
        });
        user2 = await Users.create({
            username: 'user2',
            fullName: 'Test User 2',
            email: 'user.2@bark.com',
            phoneNumber: '000-000-0000',
            pack: [user1.username],
            followedUsers: [user1.username],
            password: await sha512('password'),
        });
        token1 = await Tokens.create({
            user: user1.id,
            token: await sha512(`${uuidv4()}${user1.username}`),
            expires: null,
        });
        token2 = await Tokens.create({
            user: user2.id,
            token: await sha512(`${uuidv4()}${user2.username}`),
            expires: null,
        });
    });

    test('GET /barks', async () => {
        const bark1 = await Barks.create({
            author: user1.username,
            content: 'Bark 1',
        });
        const bark2 = await Barks.create({
            author: user1.username,
            content: 'Bark 2',
        });

        await supertest(app)
            .get('/barks')
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            author: bark1.author,
                            content: bark1.content,
                        }),
                        expect.objectContaining({
                            author: bark2.author,
                            content: bark2.content,
                        }),
                    ])
                );
            });
    });

    test('GET /barks/pack', async () => {
        const bark1 = await Barks.create({
            author: user1.username,
            content: 'Bark 1',
        });
        const bark2 = await Barks.create({
            author: user1.username,
            content: 'Bark 2',
        });
        await supertest(app)
            .get(`/barks/pack?token=${token2.token}`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            author: bark1.author,
                            content: bark1.content,
                        }),
                        expect.objectContaining({
                            author: bark2.author,
                            content: bark2.content,
                        }),
                    ])
                );
            });
    });

    test('GET /barks/bookmarks', async () => {
        const bark = await Barks.create({
            author: user1.username,
            content: 'Bark 1',
        });
        const user = await Users.findByIdAndUpdate(user1.id, {
            bookmarked: [{ id: bark.id, timestamp: Date.now() }],
        });

        await supertest(app)
            .get(`/barks/bookmarks?token=${token1.token}`)
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            bark: expect.objectContaining({
                                author: bark.author,
                                content: bark.content,
                            }),
                            timestamp: expect.anything(),
                        }),
                    ])
                );
            });
    });

    test('GET /barks/:id', async () => {
        const bark = await Barks.create({
            author: user1.username,
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
                        author: user1.username,
                        content: 'Bark 1',
                    })
                );
            });
    });

    test('POST /barks/create', async () => {
        await supertest(app)
            .post('/barks/create')
            .send({
                content: 'Bark 1',
                token: token1.token,
            })
            .expect(200)
            .then(async (response) => {
                const bark = await Barks.findOne({ author: user1.username });
                expect(bark).toEqual(
                    expect.objectContaining({
                        author: user1.username,
                        content: 'Bark 1',
                    })
                );
            });
    });
    test('DELETE /barks/:id/delete', async () => {
        const bark = await Barks.create({
            author: user1.username,
            content: 'Bark 1',
        });

        await supertest(app)
            .delete(`/barks/${bark.id}/delete?token=${token1.token}`)
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
