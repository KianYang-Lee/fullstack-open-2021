const express = require('express');
const { Todo } = require('../mongo/index');
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const addedTodos = await redis.getAsync("added_todos");
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });
  await redis.setAsync("added_todos", Number(addedTodos) + 1);
  res.send(todo);
});

// 12.10 Todo Counter
router.get('/statistics', async (req, res) => {
  const addedTodos = await redis.getAsync("added_todos");
  const stats = { "added_todos": addedTodos };
  res.json(stats);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
// 12.7 
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
// 12.7
singleRouter.put('/', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, req.body, { new: true });
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter);


module.exports = router;
