const express = require('express');

const app = express();

app.use((req, res) => {
  res.send('Hello World!');
});

const server = app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening on port ${server.address().port}`);
});
