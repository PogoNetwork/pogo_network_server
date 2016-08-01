/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initListApi            : function initListApi ( app, passportStrategy ) {
        const that = this;
        app.get( '/options/pogoTeams', function ( req, res ) {
            res.send( [ 'none', 'valor', 'mystic', 'instinct' ] );
        } );
        app.get( '/options/friendRequestStatus', function ( req, res ) {
            res.send( that.friendRequestStatusList() );
        } );
        return app;
    },
    friendRequestStatusList: function () {
        return [ 'pending', 'accepted', 'refused' ];
    }
};