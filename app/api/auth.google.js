/*globals module, require ,console, __dirname, User*/

module.exports = {
    initAuthGoogleApi: function initAuthGoogleApi ( app, passport, passportStrategy ) {
        app.get( '/', function ( req, res ) {
            res.send( 'Hello World!' );
        } );
        app.get( '/logout', function ( req, res ) {
            req.logout();
        } );

        app.get( '/auth/google/callback', passport.authenticate( 'google', {
            failureRedirect: '/',
            successRedirect: '/profile'
        } ) );

        app.get( '/auth/google',
            passport.authenticate( 'google', { scope: [ 'email', 'profile' ] } ) );

        app.get( '/profile', passportStrategy.isLoggedIn, function ( req, res ) {
            res.send( 'Hello World MA GUEULE CONNECTé!' );
        } );
    }
};
