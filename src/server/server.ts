const jsonServer = require('json-server');
const disableCors = require('./disable-cors');

const server = jsonServer.create();
const router = jsonServer.router('api/db.json');
const middlewares = jsonServer.defaults();

server.use(disableCors);
server.use(middlewares);
server.use(router);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
