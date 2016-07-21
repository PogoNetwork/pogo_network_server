/*globals require ,console,__dirname,User*/
const fs = require('fs'),
    https = require('https'),
    app = require('express')(),
    passport = require('passport'),
    passportStrategy = require('./passport/passportStrategy'),
// https://www.sitepoint.com/how-to-use-ssltls-with-node-js/
    options = {
        key: fs.readFileSync('./devKeys/server.key'),
        cert: fs.readFileSync('./devKeys/server.crt')
    };
// init passport custom function for set google Oauth2 working
passportStrategy.init(passport);

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

// must route under /api/ to be logged in to use
// comment if you want to test api route without login
app.all('/api/*', passportStrategy.isLoggedIn);


// set router express with some road for login
require('./api/auth.google.js').initAuthGoogleApi(app, passport, passportStrategy);
require('./api/manage.trainer.js').initUserApi(app, passportStrategy);


https.createServer(options, app).listen(3000, function () {
    console.log('Started!');
});