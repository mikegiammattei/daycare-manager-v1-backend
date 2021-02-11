const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Replaces body-parser.
app.use(express.json());

// Allow access CORS
app.use(cors());

// Routes
const apiRoute = require('./routes/api/api');
app.get('/', (req,res) =>{
    res.send("Root API");
});

const adminRoute = require('./routes/api/admin-user');
app.use('/api/admin', adminRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
// Test 2