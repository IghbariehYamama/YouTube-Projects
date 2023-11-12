const express = require('express');
const studentRoutes = require('./src/student/routes');

const app = express();
const port = 3000;

//this allows us to host and get json from our endpoints
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/v1/students', studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));