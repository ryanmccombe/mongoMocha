const assert = require('assert');
const User = require('../src/user');

describe('Record validation', () => {
   it('requires a user name', () => {
       const user = new User({ name: undefined });
       const validationResult = user.validateSync();
       const { message } = validationResult.errors.name;
       assert(message === 'Name is required');
   });

   it('requires a name to be longer than 2 characters', () => {
       const user = new User({ name: 'Jo' });
       const validationResult = user.validateSync();
       const { message } = validationResult.errors.name;
       assert(message === 'Name must be longer than 2 characters');
   });

   it('disallows invalid records from being saved', (done) => {
       const user = new User({ name: 'Jo' });
       user.save().catch((validationResult) => {
           const { message } = validationResult.errors.name;
           assert(message === 'Name must be longer than 2 characters');
           done();
       })
   })
});