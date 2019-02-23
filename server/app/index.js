const express = require('express');
const app = express();
const initRoutes = require('./routes');
const port = 8888;
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
    exposedHeaders: 'x-auth',
  };
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '50mb'}));

// setup all route handlers
initRoutes(app);

// db connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://madmax96:madmax96@ds239055.mlab.com:39055/img-share',{useNewUrlParser:true})
    .then(startServer)
    .catch(e=>console.log(e));

function startServer(){
    app.listen(port,()=>console.log(`server started at port ${port}`));
}