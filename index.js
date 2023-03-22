const app = require("./app");
const config = require("./config/config");

const http = require("http");

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
