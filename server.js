const http = require('http');
const app = require('./app');
const CONSTANTS = require('./constants');

const server = http.createServer(app);

const PORT = CONSTANTS.PORT

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})