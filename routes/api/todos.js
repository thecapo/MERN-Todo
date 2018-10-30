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
// @desc    Create 
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
    .catch(err => res.status(400).json({ todonotfound: 'No Todos Found' }));
});

// @route   GET api/todos/
// @desc    Get all todos
// @access  Public 

router.get('/', (req, res) => {
  Todo
    .find(Todo)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ notodos: 'Todos Not Found' }));
});

// @route   GET api/todos/todo
// @desc    Get one todo
// @access  Public 

router.get('/todo', (req, res) => {
  Todo
    .findOne(req.body.title)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ notodo: 'No Todo Found' }));
});

// @route   GET api/todos/:id
// @desc    Get one todo
// @access  Public 

router.get('/:id', (req, res) => {
  Todo
    .findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ notodoid: 'No Todo with ID' }));
});

module.exports = router;