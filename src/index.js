const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// import uuid

const { v4: uuidv4 } = require('uuid');

// in memory user store

const users = {};

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email){
        return res.status(400).json({error: 'Name and email are required.'});
    }
    const id = uuidv4();
    const user = { id, name, email };
    users[id] = user;

    res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
    const user = users[req.params.id];
    
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json(user);
});

app.put('/users/:id', (req,res) => {
    const { name, email } = req.body;
    const id = req.params.id;

    if (!users[id]) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    users[id] = { id, name, email };
    res.status(200).json(users[id]);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    if (!users[id]){
        return res.status(404).json({ error: 'User not found.'});
    }

    delete users[id];
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing