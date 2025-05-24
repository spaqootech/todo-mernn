const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post('/', async (req, res) => {
  const newTodo = new Todo({ title: req.body.title });
  const saved = await newTodo.save();
  res.json(saved);
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        completed: req.body.completed,
        ...(req.body.title && { title: req.body.title })
      },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
