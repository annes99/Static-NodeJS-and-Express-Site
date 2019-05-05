// requireing Express and JSON file
const express = require('express');
const { projects } = require('./data.json');

// setting port to 3000 or PORT to tell web server what port to listen (for Heroku)
const port = process.env.PORT || 3000;
const app = express();

/**** Set up middleware ****/

// using express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));

// setting “view engine” to “pug”
app.set('view engine', 'pug');

/**** Set routes ****/

// '/' route render the index page with the locals set to properties
app.get('/', (req, res) => {
    res.render('index', { projects }  );
});

// '/about' route to render the "About" page
app.get('/about', (req, res) => {
    res.render('about');
});

// '/project' route to dynamically change based on projects id
// if id is in the range of actual projects then render 'project'
// else => next() render 'error'
app.get('/project/:id', (req, res, next) => {
    const { id } = req.params;
    const data = projects[id];

    if(id >= 0 && id < projects.length) {
       res.render( 'project', { data } );
    } else {
        next();
    }
  });

/**** error handling ****/

// for non-existent route render 'error'
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
  });

app.listen(port, () => {
    console.log(`The application is running on localhost: ${port}`);
});