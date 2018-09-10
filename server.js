// file to configuring things, create server and bind it to a port

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials((__dirname + '/views/partials'));

// registering middleware
app.set('View engine', 'hbs');
// app.use(express.static(__dirname + '/public'));

// server tracker
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    });

    next();    
});

// to turn on maintenance mode!
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// handlebar helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// register a handler - first arg is url, second arg is fun to run to send back the rquest
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    //passing json/object
    // res.send({
    //     name: 'Kapil',
    //     likes: [
    //         'Biking',
    //         'Movies'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home',
        // use instead hbs helpers: currentYear: new Date().getUTCFullYear(),
        welcomeMessage: 'Welcome to web server demo!!'
    });
});

app.get('/about', (req,res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About page'
        // use instead hbs helpers: currentYear: new Date().getUTCFullYear()
    });
});

// create route /bad - send back json with errorMessage property
app.get('/bad', (req, res) => {    
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

//app.listen(3000);
// app.listen(3000, () => {
//     console.log('Server is up')
// });

//heroku - use env var instead of static port
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});