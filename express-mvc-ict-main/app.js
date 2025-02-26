const express = require('express');
const app = express();

const port = 3000 || process.env.PORT;

const userRoute = require('./routes/user');


app.use('/', userRoute)

app.listen(port, () => {
    console.log('Server is running on port 3000');
 })