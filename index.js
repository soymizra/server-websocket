const express = require('express')();
const http = require('http').Server(express);
const path = require('path'); 

const channels = require('./socket');
channels(http);
//const app = express();

const port = process.env.PORT || 3000;

express.set('view engine', 'ejs');

express.get('/', (req, res)=>{
    res.render('index');
    //res.sendFile(path.join(__dirname,'/index.html'));
});

express.get('/post', (req, res) => {
    res.render('post');
});

express.get('/salas', (req, res) => {
    res.render('salas');
})

http.listen(port, ()=>{ console.log('Server on port: '+port) });