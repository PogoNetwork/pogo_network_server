/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    optionsLists = require( './options.list.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initUserApi                       : function initUserApi ( app, passportStrategy ) {
        const that = this;
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

        app.put( '/trainer/:id', that.editUserNameAndTeamAndConnection );

        app.delete( '/trainer/:id', that.deleteAccount );

        app.post( '/trainer/add/:id', that.addFriendById );

        return app;
    },
    getUser                           : function ( profile ) {
        const pool = new Pool( pgConfig ),
            query = 'SELECT * FROM trainers_network.trainers WHERE google_id=' + profile.id + ';';
        return pool.query( query );
    },
    createUser                        : function ( req, profile ) {
        const pool = new Pool( pgConfig ),
            query = 'INSERT INTO trainers_network.trainers (google_id,display_name,emails,user_profile_data) VALUES (\'' +
                profile.id + '\',\'' +
                profile.displayName + '\',\'' +
                profile.emails[ 0 ].value + '\',\' ' +
                JSON.stringify( profile ) + '\') RETURNING *;';
        return pool.query( query ).then( function ( data) {
            req.session[ 'first_connection' ] = data.rows[ 0 ][ 'first_connection' ];
            req.session.user = data.rows[ 0 ];
            console.log( 'create new user with google_id :', data.rows[ 0 ][ 'google_id' ], data.rows[ 0 ][ 'display_name' ] );
        } );
    },
    'editUserNameAndTeamAndConnection': function ( req, res ) {
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
            query += ' first_connection=\'' + true + '\'';
        }
        query += ';';

        pool.query( query )
            .then( function ( data ) {
                console.log( data );
                res.status( 200 ).send( data );
            }, function ( err ) {
                console.log( err );
                res.send( err );
            } );
    },
    'deleteAccount'                   : function ( req, res ) {
        const pool = new Pool( pgConfig ),
            query = 'UPDATE trainers_network.trainers SET account_deleted= true;';
        pool.query( query )
            .then( function ( data ) {
                res.send( data );
            }, function ( err ) {
                console.log( err );
                res.send( err );
            } );
    },
    addFriendById                     : function ( req, res ) {
        // const pool = new Pool( pgConfig ),
        //     query = 'INSERT INTO trainers_network.friends (google_id,display_name,emails,user_profile_data) VALUES (\'' +
        //         profile.id + '\',\'' +
        //         profile.displayName + '\',\'' +
        //         profile.emails[ 0 ].value + '\',\' ' +
        //         JSON.stringify( profile ) + '\') RETURNING *;';
        // return pool.query( query ).then( function ( data) {
        //     req.session[ 'first_connection' ] = data.rows[ 0 ][ 'first_connection' ];
        //     console.log( 'create new user with google_id :', data.rows[ 0 ][ 'google_id' ], data.rows[ 0 ][ 'display_name' ] );
        // } );
    }
};

