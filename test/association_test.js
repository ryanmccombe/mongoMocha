const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'blogPost Title', content: 'blogPost Content'});
        comment = new Comment({ content: 'Content Body' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([
            joe.save(),
            blogPost.save(),
            comment.save()
        ]).then(() => done());
    });

    it('between user and blogpost', (done) => {
       User.findOne({ name: 'Joe' }).populate('blogPosts').then((user) => {
           // Comment is not populated as mongoose doesn't support nested populate
           // http://github.com/buunguyen/mongoose-deep-populate
           assert(user.blogPosts[0].title === 'blogPost Title');
           done();
       })
    });

    it('with deep nesting', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'blogPost Title');
                assert(user.blogPosts[0].comments[0].content === 'Content Body');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            })
    })
});