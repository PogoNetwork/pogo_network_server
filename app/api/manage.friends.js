/*globals module, require ,console, __dirname, User*/
const pg = require( 'pg' ),
    pgConfig = require( '../config/pgConfig.js' ),
    optionsLists = require( './options.list.js' ),
    Pool = require( 'pg-pool' );

module.exports = {
    initFriendsApi        : function initFriendApi ( app ) {
        const that = this;
        /**
         * @api {get} /friends/:status/:friendID Get friends list data or unique friend data by status
         * @apiName getFriendsData
         * @apiGroup Friends
         *
         * @apiParam {String} status Mandatory Friendship status request status .
         * @apiParam {number} friendID Optional FriendID defined friend id if we want only him.
         *
         * @apiExample {curl} Example with filter pending usage:
         *     curl -i http://localhost:3000/friends/pending/2
         * @apiExample {curl} Example with filter accepted usage:
         *     curl -i http://localhost:3000/friends/accepted/2
         */
        app.get( '/friends/:status/:friendID?', that.getFriendsInfo );
        /**
         * @api {post} /friends/:id Create friend
         * @apiName addFriendById
         * @apiGroup Friends
         *
         * @apiSuccess {Object} data Response object from create friend request.
         * @apiSuccess {String} data.message Information field.
         * @apiSuccess {String} data.is_accepted Current request status.
         *
         */
        app.post( '/friends/:id', that.addFriendById );
        /**
         * @api {put} /friends/:id Update friend status
         * @apiName updateFriendshipStatus
         * @apiGroup Friends
         *
         * @apiSuccess {Object} data Current request status after update.
         *
         *
         */
        app.put( '/friends/:id', that.updateFriendshipStatus );
        /**
         * @api {delete} /friends/:id Delete accepted friend
         * @apiName removeFriendById
         * @apiGroup Friends
         *
         */
        app.delete( '/friends/:id', that.removeFriendById );

        return app;
    },
    getFriendsInfo        : function ( req, res ) {
        'use strict';
        const pool = new Pool( pgConfig );
        let query;
        if ( optionsLists.friendRequestStatusList().includes( req.params[ 'status' ] ) ) {
            if ( !req.params.friendID ) {
                query = ' SELECT * FROM trainers_network.trainers WHERE id=' +
                    '(SELECT id_to AS friend FROM trainers_network.friends WHERE id_from = ' +
                    req.session.user[ 'id' ] +
                    ' AND is_accepted=\'' +
                    req.params[ 'status' ] +
                    '\' UNION SELECT id_from AS friend FROM trainers_network.friends WHERE id_to = ' +
                    req.session.user[ 'id' ] + ' AND is_accepted=\'' +
                    req.params[ 'status' ] + '\');';
            }
            else {
                query = 'SELECT * FROM trainers_network.trainers WHERE id=' +
                    '(SELECT id_to AS friend FROM trainers_network.friends WHERE id_from = ' +
                    req.session.user[ 'id' ] +
                    ' AND id_to = ' +
                    req.params.friendID +
                    ' AND is_accepted=\'' +
                    req.params[ 'status' ] +
                    '\' UNION SELECT id_from AS friend FROM trainers_network.friends WHERE id_to = ' +
                    req.session.user[ 'id' ] +
                    ' AND id_from = ' +
                    req.params.friendID + ' AND is_accepted=\'' +
                    req.params[ 'status' ] + '\' );';
            }
            pool.query( query )
                .then( function ( data ) {
                    console.log( 'get friends', query );
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
            res.status( 203 ).send( 'missing url path friend request status param ' + optionsLists.friendRequestStatusList() );
        }
    },
    addFriendById         : function ( req, res ) {
        const pool = new Pool( pgConfig ),
            queryGetFriend = 'SELECT * FROM trainers_network.friends WHERE id_from = ' +
                req.session.user[ 'id' ] +
                ' AND id_to= ' +
                req.params.id +
                ' UNION SELECT * FROM trainers_network.friends WHERE id_to = ' +
                req.session.user[ 'id' ] +
                ' AND id_from= ' + req.params.id + ';',

            query = 'INSERT INTO trainers_network.friends (id_from,id_to) VALUES (\'' +
                req.session.user[ 'id' ] + '\',\'' +
                req.params.id + '\') RETURNING *;';

        console.log( 'try create add friend ' );
        if ( req.session.user[ 'id' ] !== parseInt( req.params.id, 10 ) ) {
            // console.log( 'try GetFriend', queryGetFriend );
            // console.log( 'try query', query );
            pool.query( queryGetFriend )
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
                            message      : 'friend request status',
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
    updateFriendshipStatus: function ( req, res ) {
        const pool = new Pool( pgConfig ),
            query = 'UPDATE trainers_network.friends SET is_accepted= \'' +
                req.body[ 'is_accepted' ] +
                '\' WHERE (id_from = ' +
                req.session.user[ 'id' ] +
                ' AND id_to = ' +
                req.params.id +
                ') OR (id_to = ' +
                req.session.user[ 'id' ] +
                ' AND id_from = ' +
                req.params.id + ') RETURNING *;';

        if ( optionsLists.friendRequestStatusList().includes( req.body[ 'is_accepted' ] ) ) {
            pool.query( query )
                .then( function ( data ) {
                    console.log( 'update friend request status' );
                    if ( 0 >= data.rowCount ) {
                        res.status( 203 ).send( 'Friend request not found' );
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
    removeFriendById      : function ( req, res ) {
        const pool = new Pool( pgConfig ),
            query = 'DELETE FROM trainers_network.friends WHERE ((id_from = ' +
                req.session.user[ 'id' ] +
                ' AND id_to= ' +
                req.params.id +
                ' ) OR (id_to = ' +
                req.session.user[ 'id' ] +
                ' AND id_from= ' + req.params.id +
                ') ) AND ( is_accepted=\'' +
                optionsLists.friendRequestStatusList()[ 1 ] + '\');';

        pool.query( query )
            .then( function ( data ) {
                console.log( 'update friend request status' );
                if ( 0 >= data.rowCount ) {
                    res.status( 203 ).send( 'Friendship not found' );
                }
                else {
                    res.status( 200 ).send( 'Friendship deleted' );
                }
            }, function ( err ) {
                console.log( err );
                res.send( err );
            } );
    }
};

