const express = require('express');
const router = express.Router();
const _ = require('lodash');

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

// @route   PATCH api/todos/edit/:id
// @desc    Get one todo
// @access  Public 


router.patch('/edit/:id', (req, res) => {
  const { errors, isValid } = validateTodoInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id;
  const body = _.pick(req.body, ['title', 'completed']);

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ cannotupdate: 'Cannot Update Todo' }));
});

// @route   DELETE api/todos/delete/:id
// @desc    Get one todo
// @access  Public || Private

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ cannotremove: 'Cannot Remove Todo' }));

});

module.exports = router;