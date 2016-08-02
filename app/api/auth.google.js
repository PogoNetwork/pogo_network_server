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
        /**
         * @api {get} /auth/google Request oAuth2 Google login
         * @apiName authGoogle
         * @apiGroup auth
         *
         * @apiSuccess {Redirect} google redirection Redirect to google auth services and if login succeed we store the user info.
         *
         */
        app.get( '/auth/google',
            passport.authenticate( 'google', { scope: [ 'email', 'profile' ] } ) );

        app.get( '/profile', passportStrategy.isLoggedIn, function ( req, res ) {
            res.send( 'Hello World MA GUEULE CONNECTé!' );
        } );
    }
};
