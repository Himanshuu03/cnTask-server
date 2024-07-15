const express = require('express');
const app = express();
const dbConnect = require('./Connection/dbConnect');
const cors = require("cors");
const User = require("./Model/User/user");
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
})


app.post('/createUser', async (req, res) => {
    const { userName } = req.body;
    try {
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            console.log('User already exists:', existingUser);
            return res.json({ msg: 'User already exists' });
        }

        const newUser = new User({
            userName: userName,
            todos: []
        });

        const user = await newUser.save();
        console.log('User saved:', user);
        res.status(200).json({
            msg: 'User created successfully',
            user: user
        });
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});


app.post('/createTodo', async (req, res) => {
    const { title, desc, date, active, priority, userName } = req.body;
    const newTodo = { title, desc, date, active, priority };

    try {
        const user = await User.findOne({ userName });
        if (!user) {
            console.log('User not found');
            return res.json({ msg: 'User not found' });
        }

        user.todos.push(newTodo);
        const updatedUser = await user.save();

        res.status(200).json({
            msg: 'Todo created successfully',
            user: updatedUser
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});


app.delete('/deleteTodo', async (req, res) => {
    const { userName, todoId } = req.body;

    try {
        const user = await User.findOne({ userName });
        if (!user) {
            console.log('User not found');
            return res.json({ msg: 'User not found' });
        }

        user.todos.id(todoId).remove();
        const updatedUser = await user.save();

        res.status(200).json({
            msg: 'Todo deleted successfully',
            user: updatedUser
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

app.put('/updateTodo', async (req, res) => {
    const { userName, todoId, title, desc, date, active, priority } = req.body;

    try {
        const user = await User.findOne({ userName });
        if (!user) {
            console.log('User not found');
            return res.json({ msg: 'User not found' });
        }

        const todo = user.todos.id(todoId);
        if (todo) {
            todo.title = title;
            todo.desc = desc;
            todo.date = date;
            todo.active = active;
            todo.priority = priority;

            const updatedUser = await user.save();

            res.status(200).json({
                msg: 'Todo updated successfully',
                user: updatedUser
            });
        } else {
            res.status(404).json({ msg: 'Todo not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

app.listen(8080,()=>{
    console.log('Server is running on port 8080');
    dbConnect();
})