/*globals module, require ,console, __dirname, User*/

module.exports = {
    initUserApi: function initUserApi(app, passport, passportStrategy) {
        app.get('/trainer/:id', passportStrategy.isLoggedIn, function (req, res) {

        });

        app.post('/trainer', passportStrategy.isLoggedIn, function(){

        });

        app.put('/trainer/:id', passportStrategy.isLoggedIn, function(){

        });

        app.delete('/trainer/:id', passportStrategy.isLoggedIn, function (req, res) {

        });
    }
};
