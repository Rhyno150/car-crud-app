function express () {

    function get() {

        console.log('get');
    }

    function post() {

        
    }
}

const express = require('express');
const app = express();

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Serve the index.html file
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});