const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongodb = 'mongodb://172.17.0.3/users_test';

before(() => {
    mongoose.connect(mongodb);
    mongoose.connection
        .once('open', () => {})
        .on('error', (error) => console.warn('Error', error));
});

beforeEach((done /* calling this tells mocha to continue */) => {
    // Mongo normalises names to lowercase - blogPosts -> blogposts

    // Instead of dropping all collections, could drop DB - mongoose.connection.db.dropDatabase();
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
       comments.drop(() => {
           blogposts.drop(() => {
               done();
           });
       });
   });
});