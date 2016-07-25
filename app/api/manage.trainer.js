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

        // app.post('/api/trainer', function (req, res) {
        app.post( '/trainer', function ( req, res ) {
            const pool = new Pool( pgConfig );
            console.log( req.body.user_profile_data );
            pool.query( 'INSERT INTO trainers_network."trainers" (google_id,display_name,emails,user_profile_data) VALUES (\'' +
                req.body.google_id + '\',\'' +
                req.body.display_name + '\',\'' +
                req.body.emails + '\',\'' +
                req.body.user_profile_data
                + '\');' )
                .then( function ( data ) {
                    res.send( data );
                }, function ( err ) {
                    console.log( err );
                    res.send( err );
                } );
        } );

        app.put( '/api/trainer/:id', function ( req, res ) {

        } );

        app.delete( '/api/trainer/:id', function ( req, res ) {

        } );
    }
};
