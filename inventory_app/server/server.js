const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require("./routes/itemRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/Inventory', itemRoutes);

mongoose.connect('mongodb+srv://lai:inventory1@cluster0.c5wue.mongodb.net/Inventory', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.log('Failed to connect to MongoDB Atlas', err));


app.listen(8000, () => {
    console.log(`Server is running on http://localhost:8000`);
});
