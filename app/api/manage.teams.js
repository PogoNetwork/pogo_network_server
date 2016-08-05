/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    optionsLists = require( './options.list.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initTeamsApi        : function initTeamApi ( app ) {
        const that = this;

        app.get( '/teams/:teamID?', that.getTeamsInfo );

        app.post( '/teams/:teamName', that.createTeam );

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
                query = 'SELECT (t.id,t.team_name) FROM trainers_network.teams t LEFT JOIN trainers_network.memberships m ON (  t.id=m.team_id ) WHERE m.trainer_id=' + req.session.user[ 'id' ] + ' AND is_accepted=true;';
            }
            else {
                query = 'SELECT (t.id,t.team_name) FROM trainers_network.teams t LEFT JOIN trainers_network.memberships m ON (  t.id=m.team_id ) WHERE m.trainer_id=' + req.session.user[ 'id' ] + ' AND is_accepted=true AND t.id=' + req.params.teamID + ';';
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
    createTeam          : function ( req, res ) {
        const pool = new Pool( pgConfig ),

            query = 'INSERT INTO trainers_network.teams (team_name,owner_id) VALUES (\'' +
                req.params.teamName + '\',\'' +
                req.session.user[ 'id' ] + '\') ON CONFLICT (team_name) DO RETURNING *;';

        console.log( 'try create new team ' );
        if ( '/[^a-z0-9_.]/'.match( req.params.teamName ) ) {
            pool.query( query )
                .then( function ( data ) {
                    if ( 0 < data.rowCount ) {
                        res.status( 200 ).send( {
                            message: 'team created ',
                            data   : data.rows[ 0 ]
                        } );
                    }
                }, function ( err ) {
                    console.log( err );
                    res.status( 203 ).send( err );
                } );
        }
        else {
            res.status( 203 ).send( 'name should contain only a-z and 0-9' );
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

