/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initFriendsApi: function initUserApi ( app, passportStrategy ) {
        const that = this;
        app.get( '/friends', function ( req, res ) {
            const pool = new Pool( pgConfig ),
                query = 'SELECT id_from AS friend FROM trainers_network.friends WHERE id_from = ' + req.session.passport.user[ 'id' ] + ' UNION SELECT id_to AS friend FROM trainers_network.friends WHERE id_to = ' + req.session.passport.user[ 'id' ] + ';';
            pool.query( query )
                .then( function ( data ) {
                    if ( 0 >= data.rows.length ) {
                        res.status( 204 );
                    }
                    else {
                        res.send( data.rows );
                    }
                }, function ( err ) {
                    console.log( err );
                    res.send( err );
                } );
        } );

        app.post( '/friends/:id', that.addFriendById );
        // app.delete( '/friends/:id', that.removeFriendById );

        return app;
    },
    addFriendById : function ( req, res ) {
        console.log( 'pouettee', req.session, res.session );
        const pool = new Pool( pgConfig ),
            queryGetFriend = 'SELECT id_from AS friend FROM trainers_network.friends WHERE id_from = ' + req.session.passport.user[ 'id' ] + ' AND id_to= ' + req.params.id + ' UNION SELECT id_to AS friend FROM trainers_network.friends WHERE id_to = ' + req.session.passport.user[ 'id' ] + ' AND id_from= ' + req.params.id + ';',

            query = 'INSERT INTO trainers_network.friends (id_from,id_to,accepted_at) VALUES (\'' +
                req.session.user[ 'id' ] + '\',\'' +
                req.params.id + '\',\'' +
                req.body[ 'accepted_at' ] + '\') RETURNING *;';
        console.log( 'try create add friend ' );
        if ( req.session.passport.user[ 'id' ] !== req.param.id ) {
            console.log( 'try query', query );
            console.log( 'try GetFriend', queryGetFriend );
            pool.query( queryGetFriend ).then( function ( data ) {
                if ( 0 >= data.rows.length ) {
                    return pool.query( query );
                }
                else {
                    return this;
                }
            } ).then( function ( data ) {
                console.log( 'promise here ', data );
                if ( 0 >= data.rows.length ) {
                    res.status( 200 ).send( 'request send!' );
                }
            } );

        }
        else {
            res.status( 203 ).send( 'don\'t try to add yourself' );
        }
    }
};

