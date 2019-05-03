const express = require('express');
//const bodyParser = require('body-parser');
//const dataJson = require('data.json');
const { projects }= require('./data.json');


const app = express();

/**** Set up middleware ****/

//app.use(bodyParser.urlencoded({ extended: false}));

// use a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));

// set your “view engine” to “pug”
app.set('view engine', 'pug');


/**** Set routes ****/

// An "index" route (/) to render the "Home" page with the locals set to data.projects
app.get('/', (req, res, next) => {
    app.locals = data.projects;
    res.render('index');
    next();
});

// An "about" route (/about) to render the "About" page
app.get('/about', (req, res, next) => {
    res.render('about');
    next();
});


// Dynamic "project" routes (/project or /projects) based on the id of the project that 
// render a customized version of the Pug project template to show off each project. 
// Which means adding data, or "locals", as an object that contains data to be passed to the Pug template.

app.get('/project', (req, res, next) => {
    res.render('project');
    next();
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});