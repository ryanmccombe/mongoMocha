const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    'use strict'; // Block-scoped declarations not yet supported outside strict mode
    let joe;

    beforeEach((done) => {
       joe = new User({ name: 'Joe' });
       joe.save().then(() => done())
    });

    it('using the model instance remove', (done) => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('using the class method remove', (done) => {
        User.remove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('using the class method findOneAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('using the class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});