const express = require('express');

const app = express();
const port = 3000; // You can use any available port number

// Only the calculator page is public. The project root also holds
// package metadata and this server, which must not be downloadable.
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
