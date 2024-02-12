const express = require("express");
const { todoModel } = require("../model/todo.model");

const todoRouter = express.Router();

todoRouter.get('/', async (req, res) => {
    try {
        // Fetch todos from the database
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error: error.message });
    }
});

todoRouter.post('/tododata', async (req, res) => {
    try {
        // Extract todo data from the request body
        const { date, todo, time } = req.body;
        // Create a new todo instance
        const newTodo = new todoModel({ date, todo, time });
        // Save the new todo to the database
        await newTodo.save();
        res.status(201).json({ message: 'Todo added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding todo', error: error.message });
    }
});


todoRouter.get('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        // Fetch todo by ID from the database
        const todo = await todoModel.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ todo });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todo', error: error.message });
    }
});


module.exports ={todoRouter}