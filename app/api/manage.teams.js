/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    optionsLists = require( './options.list.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initTeamsApi        : function initTeamApi ( app ) {
        const that = this;

        app.get( '/teams/:teamID?', that.getTeamsInfo );

        app.post( '/teams', that.addTeamById );

        app.put( '/teams/:id', that.updateTeamshipStatus );

        app.delete( '/teams/:id', that.removeTeamById );

        return app;
    },
    getTeamsInfo        : function ( req, res ) {
        'use strict';
        const pool = new Pool( pgConfig );
        let query;
        if ( optionsLists.teamRequestStatusList().includes( req.params[ 'status' ] ) ) {
            if ( !req.params.teamID ) {
                query = ' SELECT * FROM trainers_network.teams WHERE id=' +
                    '(SELECT id_to AS team FROM trainers_network.teams WHERE id_from = ' +
                    req.session.user[ 'id' ] +
                    ' AND is_accepted=\'' +
                    req.params[ 'status' ] +
                    '\' UNION SELECT id_from AS team FROM trainers_network.teams WHERE id_to = ' +
                    req.session.user[ 'id' ] + ' AND is_accepted=\'' +
                    req.params[ 'status' ] + '\');';
            }
            else {
                query = 'SELECT * FROM trainers_network.trainers WHERE id=' +
                    '(SELECT id_to AS team FROM trainers_network.teams WHERE id_from = ' +
                    req.session.user[ 'id' ] +
                    ' AND id_to = ' +
                    req.params.teamID +
                    ' AND is_accepted=\'' +
                    req.params[ 'status' ] +
                    '\' UNION SELECT id_from AS team FROM trainers_network.teams WHERE id_to = ' +
                    req.session.user[ 'id' ] +
                    ' AND id_from = ' +
                    req.params.teamID + ' AND is_accepted=\'' +
                    req.params[ 'status' ] + '\' );';
            }
            pool.query( query )
                .then( function ( data ) {
                    console.log( 'get teams', query );
                    if ( 0 >= data.rowCount ) {
                        res.status( 204 ).send();
                    }
                    else {
                        res.send( data.rows );
                    }
                }, function ( err ) {
                    console.log( err );
                    res.send( err );
                } );
        }
        else {
            res.status( 203 ).send( 'missing url path team request status param ' + optionsLists.teamRequestStatusList() );
        }
    },
    addTeamById         : function ( req, res ) {
        const pool = new Pool( pgConfig ),
            queryGetTeam = 'SELECT * FROM trainers_network.teams WHERE id_from = ' +
                req.session.user[ 'id' ] +
                ' AND id_to= ' +
                req.params.id +
                ' UNION SELECT * FROM trainers_network.teams WHERE id_to = ' +
                req.session.user[ 'id' ] +
                ' AND id_from= ' + req.params.id + ';',

            query = 'INSERT INTO trainers_network.teams (id_from,id_to) VALUES (\'' +
                req.session.user[ 'id' ] + '\',\'' +
                req.params.id + '\') RETURNING *;';

        console.log( 'try create add team ' );
        if ( req.session.user[ 'id' ] !== parseInt( req.params.id, 10 ) ) {
            // console.log( 'try GetTeam', queryGetTeam );
            // console.log( 'try query', query );
            pool.query( queryGetTeam )
                .then( function ( data ) {
                    if ( 0 === data.rowCount ) {
                        return pool.query( query );
                    }
                    else {
                        return data;
                    }
                } )
                .then( function ( data ) {
                    if ( 0 < data.rowCount ) {
                        res.status( 200 ).send( {
                            message      : 'team request status',
                            'is_accepted': data.rows[ 0 ][ 'is_accepted' ]
                        } );
                    }
                }, function ( err ) {
                    res.status( 203 ).send( err );
                } );
        }
        else {
            res.status( 203 ).send( 'Don\'t try to add yourself' );
        }
    },
    updateTeamshipStatus: function ( req, res ) {
        const pool = new Pool( pgConfig ),
            query = 'UPDATE trainers_network.teams SET is_accepted= \'' +
                req.body[ 'is_accepted' ] +
                '\' WHERE (id_from = ' +
                req.session.user[ 'id' ] +
                ' AND id_to = ' +
                req.params.id +
                ') OR (id_to = ' +
                req.session.user[ 'id' ] +
                ' AND id_from = ' +
                req.params.id + ') RETURNING *;';

        if ( optionsLists.teamRequestStatusList().includes( req.body[ 'is_accepted' ] ) ) {
            pool.query( query )
                .then( function ( data ) {
                    console.log( 'update team request status' );
                    if ( 0 >= data.rowCount ) {
                        res.status( 203 ).send( 'Team request not found' );
                    }
                    else {
                        res.status( 200 ).send( data.rows );
                    }
                }, function ( err ) {
                    console.log( err );
                    res.send( err );
                } );
        }
        else {
            res.status( 403 ).send( ' Bad param is_accepted option given to the request' );
        }
    },
    removeTeamById      : function ( req, res ) {
        const pool = new Pool( pgConfig ),
            query = 'DELETE FROM trainers_network.teams WHERE ((id_from = ' +
                req.session.user[ 'id' ] +
                ' AND id_to= ' +
                req.params.id +
                ' ) OR (id_to = ' +
                req.session.user[ 'id' ] +
                ' AND id_from= ' + req.params.id +
                ') ) AND ( is_accepted=\'' +
                optionsLists.teamRequestStatusList()[ 1 ] + '\');';

        pool.query( query )
            .then( function ( data ) {
                console.log( 'update team request status' );
                if ( 0 >= data.rowCount ) {
                    res.status( 203 ).send( 'Teamship not found' );
                }
                else {
                    res.status( 200 ).send( 'Teamship deleted' );
                }
            }, function ( err ) {
                console.log( err );
                res.send( err );
            } );
    }
};

