const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can be created', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Joe\'s Post' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'Joe\'s Post');
                done();
            })
    });

    it('can be added to an existing record', (done) => {
        const joe = new User({ name: 'Joe', posts: []});
        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts.push({ title: 'New Post' });
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            })
    });

    it('can be removed', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Joe\'s Post' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'Joe\'s Post');
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            })
    })
});