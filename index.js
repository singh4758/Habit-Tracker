const express = require('express');
const port = 8000;
const app = express();
const db = require('./configs/mongoose');


app.use(express.static('./assets'));
app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views','./views');
app.use('/',require('./routers'));


app.listen(port,function(err){
    if(err){
        console.log('Error in starting server');
        return;
    }
    console.log('Server is Up on port',port);
})