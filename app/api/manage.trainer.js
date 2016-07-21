/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initUserApi: function initUserApi ( app, passportStrategy ) {
        app.get( '/api/trainer/:id', function ( req, res ) {
            const pool = new Pool( pgConfig );
            console.log( req.params );
            pool.query( 'SELECT * FROM trainers WHERE id="' + req.params.id + '";' )
                .then( function ( data ) {
                    res.send( data );
                }, function ( err ) {
                    res.send( err );
                } );
        } );

        app.post( '/api/trainer', function ( req, res ) {

        } );

        app.put( '/api/trainer/:id', function ( req, res ) {

        } );

        app.delete( '/api/trainer/:id', function ( req, res ) {

        } );
    }
};
