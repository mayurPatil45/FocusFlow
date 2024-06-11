const express = require('express');
const authorize = require('../middlewares/authorize');
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require("../controllers/todosController");
const { createTodoRules, updateTodoRules } = require("../middlewares/validator");
const validateResult = require("../middlewares/validationResults");

const router = express.Router();

router.get("/:id", authorize, getTodo);
router.get("/", authorize, getTodos);
router.post("/create", authorize, createTodoRules, validateResult, createTodo);
router.put("/update/:id", authorize, updateTodoRules, validateResult, updateTodo);
router.delete("/delete/:id", authorize, deleteTodo);

module.exports = router;
