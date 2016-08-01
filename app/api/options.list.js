/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' );

module.exports = {
    initListApi            : function initListApi ( app, passportStrategy ) {
        const that = this;
        app.get( '/options/pogoTeams', function ( req, res ) {
            res.send( that.pogoTeamList());
        } );
        app.get( '/options/friendRequestStatus', function ( req, res ) {
            res.send( that.friendRequestStatusList() );
        } );
        return app;
    },
    friendRequestStatusList: function () {
        return [ 'pending', 'accepted', 'refused' ];
    },
    pogoTeamList: function () {
        return [ 'none', 'valor', 'mystic', 'instinct' ];
    }
};