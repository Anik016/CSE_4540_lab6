const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
//const user = require('./models/User_Model');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://anik3:241326@cluster0.akftd.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
    email: String,
    pass: String,
});

const User = mongoose.model('users', userSchema);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', async (req, res) => {
  try {
      const users = await User.find();  
      res.json(users);  
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
  }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
