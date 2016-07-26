/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initUserApi   : function initUserApi ( app, passportStrategy ) {
        const that = this;
        app.get( '/api/trainer/:id', that.get_user );

        // app.post( '/api/trainer', that.create_user );

        app.put( '/api/trainer/:id', that.edit_user_name );

        app.delete( '/api/trainer/:id', that.delete_account );
    },
    'get_user'     : function ( req, res ) {
        const pool = new Pool( pgConfig ),
            query = 'SELECT google_id FROM trainers_network.trainers WHERE google_id=' + req.params.id + ';';
        pool.query( query )
            .then( function ( data ) {
                res.send( data.rows );
            }, function ( err ) {
                console.log( err );
                res.send( err );
            } );
    },
    'create_user'   : function ( profile ) {
        const pool = new Pool( pgConfig ),
            query = 'INSERT INTO trainers_network.trainers (google_id,display_name,emails,user_profile_data) VALUES (\'' +
                profile.id + '\',\'' +
                profile.displayName + '\',\'' +
                profile.emails[ 0 ].value + '\',\' ' +
                JSON.stringify( profile ) + '\');';
        return pool.query( query );
    },
    'edit_user_name': function ( req, res ) {
        const pool = new Pool( pgConfig ),
            query = 'UPDATE trainers_network.trainers SET display_name=' + req.body.display_name + ';';
        pool.query( query )
            .then( function ( data ) {
                res.send( data );
            }, function ( err ) {
                console.log( err );
                res.send( err );
            } );
    },
    'delete_account': function ( req, res ) {
        const pool = new Pool( pgConfig ),
            query = 'UPDATE trainers_network.trainers SET account_deleted= true;';
        pool.query( query )
            .then( function ( data ) {
                res.send( data );
            }, function ( err ) {
                console.log( err );
                res.send( err );
            } );
    }
};

