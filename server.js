const { application } = require('express');
const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json()); //handles parsing json data to javascript properties of the request object to use the date in javascript

app.all('/campsites',(req, res, next) => {      //all is a routing method that's a catch all for all http verbs, req res next are the callback functions
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); //sending back plain text in the response body 
    next(); //next function passes control of the application routing to the next relevant routing method after this one otherwise it would just stop here
});  

app.get('/campsites',(req, res) =>{
    res.end('Will send all the campsites to you'); //status code and headers are already set by app.all method
});

app.post('/campsites',(req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`)
});

app.put('/campsites', (req, res) => {
    res.statusCode =403;
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => { //need to be careful with this method
    res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => { //allows us to store whatever the client sends as part of the path after the slash as a route parameter named campsiteId
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId} `);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name} 
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req,res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1> This is an Express server </h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}: ${port}/`);
});

