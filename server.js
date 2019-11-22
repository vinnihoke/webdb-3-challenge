const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const SchemeRouter = require("./schemes/scheme-router.js");

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());
server.use("/api/schemes", SchemeRouter);

module.exports = server;
