const express = require('express');
const { projects } = require('./data.json');

const app = express();

/**** Set up middleware ****/

// use a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));

// set your “view engine” to “pug”
app.set('view engine', 'pug');

/**** Set routes ****/

// An "index" route (/) to render the "Home" page with the locals set to data.projects
app.get('/', (req, res, next) => {
    res.render('index', { projects }  );
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

app.get('/project/:id', ( req, res, next ) => {
    const { id } = req.params;
    const data = projects[id];
    res.render( 'project', { data } );
  });


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});