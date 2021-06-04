const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const initRoutes = require("./routes");
const port = 8888;
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  exposedHeaders: "x-auth",
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
// setup all route handlers
initRoutes(app);

if (!process.env.MONGO_URL) {
  throw new Error("missing env var: MONGO_URL");
}
// db connection
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(startServer)
  .catch((e) => console.log(e));

function startServer() {
  app.listen(port, () => console.log(`server started at port ${port}`));
}
