const express = require("express");
const axios = require("axios");
const app = express();
const { errorHandler } = require("./middleware/errorHandler");
const { logRequest } = require("./middleware/loggingRequest");
const {
  creation_router,
  retreiving_router,
  deletion_router,
  updating_router,
} = require("./routes/user");
require("dotenv").config();
const port = process.env.PORT || 4000;
// parsing into json middleware:
app.use(express.json());

// logging incoming request middleware:
app.use(logRequest);

// user routes:
app.use("/user", creation_router);
app.use("/user", deletion_router);
app.use("/users", retreiving_router);
app.use("/user", updating_router);

// erreor handler middleware:
app.use(errorHandler);

// server bootstrapping:
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = { server };
