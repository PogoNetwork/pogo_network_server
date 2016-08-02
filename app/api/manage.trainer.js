/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    optionsLists = require( './options.list.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initUserApi                     : function initUserApi ( app, passportStrategy ) {
        const that = this;

        /**
         * @api {get} /trainer Get our current user data
         * @apiName getTrainerData
         * @apiGroup Trainer
         *
         * @apiSuccess {Object} data Response object from get trainer profile request.
         * @apiSuccess {number} data.google_id Google id from oAuth2.
         * @apiSuccess {number} data.id Current trainer Id.
         * @apiSuccess {String} data.display_name Current trainer pseudo or name.
         * @apiSuccess {String} data.emails Current trainer email.
         * @apiSuccess {String} data.account_deleted Current trainer account status.
         * @apiSuccess {String} data.pogo_team Current trainer account status.
         * @apiSuccess {String} data.first_connection Current trainer first connection status.
         * @apiSuccess {String} data.user_profile_data all google account data from user connection.
         *
         */
        app.get( '/trainer', function ( req, res ) {
            const pool = new Pool( pgConfig ),
                query = 'SELECT * FROM trainers_network.trainers WHERE google_id=' + req.session.user.id + ';';
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

        /**
         * @api {put} /trainer/:id Edit our own trainer data
         * @apiName putTrainerData
         * @apiGroup Trainer
         *
         * @apiSuccess {Object} data Response object from get trainer profile request.
         * @apiSuccess {number} data.google_id Google id from oAuth2.
         * @apiSuccess {number} data.id Current trainer Id.
         * @apiSuccess {String} data.display_name Current trainer pseudo or name.
         * @apiSuccess {String} data.emails Current trainer email.
         * @apiSuccess {String} data.account_deleted Current trainer account status.
         * @apiSuccess {String} data.pogo_team Current trainer account status.
         * @apiSuccess {String} data.first_connection Current trainer first connection status.
         * @apiSuccess {String} data.user_profile_data all google account data from user connection.
         *
         */
        app.put( '/trainer', that.editUserNameAndTeamAndConnection );

        /**
         * @api {delete} /trainer/:id Desactivate trainer account
         * @apiName deleteTrainerData
         * @apiGroup Trainer
         *
         */
        app.delete( '/trainer/:id', that.deleteAccount );

        return app;
    },
    getUser                         : function ( profile ) {
        const pool = new Pool( pgConfig ),
            query = 'SELECT * FROM trainers_network.trainers WHERE google_id=' + profile.id + ';';
        return pool.query( query );
    },
    createUser                      : function ( req, profile ) {
        const pool = new Pool( pgConfig ),
            query = 'INSERT INTO trainers_network.trainers (google_id,display_name,emails,user_profile_data) VALUES (\'' +
                profile.id + '\',\'' +
                profile.displayName + '\',\'' +
                profile.emails[ 0 ].value + '\',\' ' +
                JSON.stringify( profile ) + '\') RETURNING *;';
        return pool.query( query ).then( function ( data ) {
            req.session[ 'first_connection' ] = data.rows[ 0 ][ 'first_connection' ];
            req.session.user = data.rows[ 0 ];
            console.log( 'create new user with google_id :', data.rows[ 0 ][ 'google_id' ], data.rows[ 0 ][ 'display_name' ] );
        } );
    },
    editUserNameAndTeamAndConnection: function ( req, res ) {
        'use strict';
        const pool = new Pool( pgConfig );
        let query = 'UPDATE trainers_network.trainers SET ';
        if ( undefined !== req.body[ 'display_name' ] ) {
            query += 'display_name=\'' + req.body[ 'display_name' ] + '\'';
        }
        if ( undefined !== req.body[ 'pogo_team_color' ] ) {
            if ( req.body[ 'display_name' ] ) {
                query += ',';
            }
            if ( optionsLists.pogoTeamList().includes( req.body[ 'pogo_team_color' ] ) ) {
                query += ' pogo_team_color=\'' + req.body[ 'pogo_team_color' ] + '\'';
            }
        }
        if ( undefined !== req.body[ 'first_connection' ] ) {
            if ( req.body[ 'pogo_team_color' ] || req.body[ 'display_name' ] ) {
                query += ',';
            }
            query += ' first_connection=\'' + req.body[ 'first_connection' ] + '\'';
        }
        query += ' WHERE id='+req.session.user.id+';';


        pool.query( query )
            .then( function ( data ) {
                console.log( data );
                res.status( 200 ).send( data );
            }, function ( err ) {
                console.log( err );
                res.send( err );
            } );
    },
    deleteAccount                   : function ( req, res ) {
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

