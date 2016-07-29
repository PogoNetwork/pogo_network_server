/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initListApi: function initUserApi ( app, passportStrategy ) {
        const that = this;
        app.get( '/options/pogoTeams', function ( req, res ) {
            res.send( [ 'none', 'valor', 'mystic', 'instinct' ] );
        } );
        app.get( '/options/friendRequestStatus', function ( req, res ) {
            res.send( [ 'pending', 'accepted', 'refused' ] );
        } );
        return app;
    }
};