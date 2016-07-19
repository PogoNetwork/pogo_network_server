/*globals require ,console,__dirname,User*/
'use strict';
const fs = require( 'fs' ),
    https = require( 'https' ),
    app = require( 'express' )(),
    passport = require( 'passport' ),
    googleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy,
    privateGoogleData = JSON.parse( fs.readFileSync( __dirname + '/../client_secret_9135989910.json', 'utf8' ) ),

// https://www.sitepoint.com/how-to-use-ssltls-with-node-js/
    options = {
        key : fs.readFileSync( './devKeys/server.key' ),
        cert: fs.readFileSync( './devKeys/server.crt' )
    };

app.use( require( 'cookie-parser' )() );
app.use( require( 'body-parser' ).json() );
app.use( require( 'body-parser' ).urlencoded( { extended: true } ) );
app.use( require( 'express-session' )( { secret: 'keyboard cat', resave: true, saveUninitialized: true } ) );

app.use( passport.initialize() );
app.use( passport.session() );

// passport config
passport.use( new googleStrategy( {
    clientID         : privateGoogleData.web[ 'client_id' ],
    clientSecret     : privateGoogleData.web[ 'client_secret' ],
    callbackURL      : privateGoogleData.web[ 'redirect_uris' ][ 0 ],
    passReqToCallback: true
},
    function ( accessToken, refreshToken, profile, cb ) {
        console.log( profile, refreshToken, accessToken );
        // here we save our user credentials like email etc...
        User.findOrCreate( { googleId: profile.id }, function ( err, user ) {
            return cb( err, user );
        } );
    }
) );

app.get( '/', function ( req, res ) {
    res.send( 'Hello World!' );
} );
app.get( '/auth/succes', function ( req, res ) {
    // console.log(req)
    res.send( req.body );
} );

app.get( '/login/',
    passport.authenticate( 'google', {
        scope                                                            : [ 'profile', 'email',
            'https://www.googleapis.com/auth/calendar' ], failureRedirect: '/'
    } ),
    function ( req, res ) {
        res.send( 'googleCONNECTED' );
    } );

https.createServer( options, app ).listen( 3000, function () {
    console.log( 'Started!' );
} );