const express = require('express');
const router = express.Router();

// Load Input Validation
const validateTodoInput = require('../../validation/validateTodoInput');

// Load Todo Model
const Todo = require('../../models/Todo');

// @route   GET api/todos/test
// #desc    Test 
// @access  Public

router.get('/test', (req, res) => res.json({ msg: 'test successful' }));

// @route   POST api/todos/new-todo
// #desc    Create 
// @access  Public || Private

router.post('/new-todo', (req, res) => {
  const { errors, isValid } = validateTodoInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newTodo = new Todo({
    title: req.body.title
  });

  newTodo
    .save()
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ todonotfound: 'No Todos Found'}));
});

// @route   POST api/todos/new-todo
// #desc    Create 
// @access  Public || Private

module.exports = router;