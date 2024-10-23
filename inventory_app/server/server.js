const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
 
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', userRoutes)
 
mongoose.connect("mongodb://localhost:27017/InventoryDatabase", {
})

 
app.listen(8000, () => {
    console.log(`Server is up and running  `);
});