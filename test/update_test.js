const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    'use strict'; // Block-scoped declarations not yet supported outside strict mode
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', visits: 0 });

        joe.save().then(() => {
            done();
        })
    });

    function assertOneUserCalledAlex(promise, callback) {
        promise
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                callback();
            });
    }

    it('using model instance type set and save', (done) => {
        joe.set('name', 'Alex');
        assertOneUserCalledAlex(joe.save(), done);
    });

    it('using model instance update', (done) => {
        assertOneUserCalledAlex(joe.update({ name: 'Alex' }), done);
    });

    it('using model class update', (done) => {
        assertOneUserCalledAlex(
            User.update({ name: 'Joe' }, { name: 'Alex' }),
            done
        );
    });

    it('using model class findOneAndUpdate', (done) => {
        assertOneUserCalledAlex(
            User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
            done
        );
    });

    it('using model class findByIdAndUpdate', (done) => {
        assertOneUserCalledAlex(
            User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
            done
        );
    });

    it('by incrementing visits', (done) => {
        User.update({ name: 'Joe' }, { $inc: { visits: 1 } })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.visits === 1);
                done();
            });
    })
});