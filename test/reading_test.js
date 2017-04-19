const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    'use strict'; // Block-scoped declarations not yet supported outside strict mode
    let joe, alex, maria, zara;

    beforeEach((done) => {
        alex = new User({ name: 'Alex'});
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        zara = new User({ name: 'Zara' });

        Promise.all([
            alex.save(),
            joe.save(),
            maria.save(),
            zara.save()
        ]).then(() => done())
    });

    it('for all users with a name of Joe', (done) => {
        User.find({ name: 'Joe' }).then((users) => {
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        })
    });

    it('for a user with a particular id', (done) => {
        User.findOne({ _id: joe._id }).then((user) => {
            assert(user._id.toString() === joe._id.toString());
            assert(user.name === 'Joe');
            done();
        });
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done();
            });
    });
});