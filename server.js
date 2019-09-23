const http = require('http');
const app = require('./app');

const port = process.env.PORT || '3000'; // normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
