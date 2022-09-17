const express = require('express');
const { logger, validateUserId, validatePost, validateUser } = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const users = require('./users-model')
const post = require('../posts/posts-model')
const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
  .then(user => {
    res.json(user);
  })
  .catch(next);
});

router.get('/:id', logger, validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const userId = req.params.id
  users.getById(userId)
  .then(user => {
    res.json(user);
  })
  .catch(next);
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const userPost = ({ name: req.name})
  users.insert({ name: req.name})
  .then(user => {
    res.status(201).json(user);
  })
  .catch(next);
});

router.put('/:id', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const userPost = req.params.id
  users.update(req.params.id, { name: req.name} )
  .then(()=>{
    return users.getById(req.paarams.id)
  })
  .then(user => {
    res.json(user);
  })
  .catch(next);
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const userId = await req.params.id
  users.remove(userId)
  .then(user => {
    res.status(200).json(req.user);
  })
  .catch(next);
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const userId = req.params.id
  users.getUserPosts(userId)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
try{
 const result = await post.insert({
    user_id: req.paarams.id,
    text: req.text
  })
    res.status(201).json(result);
}catch(err){
  next(err)
}
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something bad happened",
    message: err.message,
    stack: err.stack
  })
})

module.exports = router
// do not forget to export the router
