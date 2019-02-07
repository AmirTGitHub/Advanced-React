// let's go!

require("dotenv").config({ path: "./variable.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();
const port = process.env.PORT;

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  () => {
    console.log(`server is running on http://localhost:${port}`);
  }
);
