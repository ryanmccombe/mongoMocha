const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'blogPost Title', content: 'blogPost Content'});

        joe.blogPosts.push(blogPost);

        Promise.all([
            joe.save(),
            blogPost.save(),
        ]).then(() => done());
    });

    it('removes associated blogPosts when removing user', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            })
    })
});