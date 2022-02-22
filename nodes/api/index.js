const express = require('express');

const routes = require('./routes/history-routes');

class index {
    constructor(){
        this.server  = express();
        this.routes();
    }
    routes(){
        this.server.use(routes);
    }
}


module.exports = new index().server;
