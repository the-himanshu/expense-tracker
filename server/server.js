const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, '../build')))

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'), 'index.html')
});