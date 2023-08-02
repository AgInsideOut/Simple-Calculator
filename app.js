const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // You can use any available port number

// Serve static files (HTML, CSS, JS) from the root directory
app.use(express.static(__dirname));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});