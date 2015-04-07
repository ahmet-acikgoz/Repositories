(function(homeController) {
    homeController.init = function(expressApp) {

    	console.log("Home Controller initializing...");

        expressApp.get('/', function(req, resp) {
            console.log("Request came to server");
            resp.write('<h1>Message from node server</h1>');
            resp.end();
        });

        expressApp.get('/getView', function(req, resp) {
            resp.render('firstpage', {
                message: 'Message from node js'
            });
        });

        expressApp.get('/getAdminView', function(req, resp) {
            resp.render('./admin/admin', {
                message: 'Message from node js with admin folder'
            });
        });

        console.log("Home Controller initialized...");
    };
})(module.exports);