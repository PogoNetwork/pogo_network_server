/*globals module, require ,console, __dirname, User*/
'use strict';
const googleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy,
    fs = require( 'fs' ),
    manageTrainer = require( '../api/manage.trainer.js' ),
    privateGoogleData = JSON.parse( fs.readFileSync( __dirname + '/../../client_secret_9135989910.json', 'utf8' ) );
/**
 * init google strategy for passport and set serialize / deserialize of user session
 * @param passport
 */
function initPassportStrategy ( passport ) {
// passport init google config
    passport.use( new googleStrategy( {
        clientID    : privateGoogleData.web[ 'client_id' ],
        clientSecret: privateGoogleData.web[ 'client_secret' ],
        callbackURL : privateGoogleData.web[ 'redirect_uris' ][ 0 ]
    },
    function ( accessToken, refreshToken, profile, done ) {
        console.log( 'profile Google', profile );
        // here we save our user credentials like email etc...
        manageTrainer.get_user( profile ).then( function ( data ) {
            if ( 0 >= data.rows.length ) {
                manageTrainer.create_user( profile ).then( function () {
                    return console.log( 'user created' );
                } );
            }
        } );
        return done( null, profile );
    } )
    );

    passport.serializeUser( function ( user, done ) {
        done( null, user );
    } );

    passport.deserializeUser( function ( user, done ) {
        done( null, user );
    } );

}
// route middleware to make sure a user is logged in
function isLoggedIn ( req, res, next ) {

    // if user is authenticated in the session, carry on
    if ( req.isAuthenticated() ) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect( '/' );
}

module.exports = {
    isLoggedIn: isLoggedIn,
    init      : initPassportStrategy
};
