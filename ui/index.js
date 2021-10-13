const path = require('path');
const express = require('express');

const app = express();

const nhsDirectory = path.dirname(require.resolve('nhsuk-frontend/package.json'));

app.use('/assets', express.static(path.resolve(nhsDirectory, './packages/assets')));
app.use('/dist', express.static(path.resolve(nhsDirectory, './dist')));

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
});

const server = app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening on port ${server.address().port}`);
});
