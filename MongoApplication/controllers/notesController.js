(function(notesController) {
    var data = require('../data');
    var bodyParser = require('body-parser');
    notesController.init = function(expressApp) {
        expressApp.use(bodyParser());
        console.log("Note Controller initializing...");

        expressApp.get('/notes', function(req, resp) {
            //getting initial notes from data
            //var initNotes=data.getNotes();
            data.getNotes(function(err, notes) {
                if (err) {
                    console.log("error occured while gathering data with " + JSON.stringify(err));
                } else {
                    resp.render('notes', {
                        notes: notes
                    });
                };
            });
        });

        expressApp.get('/newnote', function(req, resp) {
            resp.render('newnote');
        });

        expressApp.post('/newnote', function(req, resp) {
            var nName = req.body.name;
            data.insertCategory(nName,function(err, result) {
                if (err) {
                    console.log("Error occured while inserting data controller");                    
                    resp.render('newnote', { result : "1" });
                } else {
                    data.getNotes(function(err, notes) {
                        console.log("Saved Succes");
                        if (err) {
                            console.log("error occured while gathering data with " + JSON.stringify(err));
                        } else {
                            resp.render('notes', {
                                notes: notes
                            });
                        };
                    });
                }
            });
        });

        expressApp.get('/note/:cName', function(req, resp) {
            var cName = req.params.cName;
            data.getNotesByName(cName,function(err,notes) {
                if (err) {
                    console.log("error occured while gathering data with " + JSON.stringify(err));
                } else {
                    resp.render('note', {
                        notes: notes
                    });
                };
            });
        });

        expressApp.post('/note/:cName', function(req, resp) {
            var nName = req.body.name;
            var nAuth = req.body.author;
            var nColor = req.body.color;
            var cName = req.params.cName;

            var note = {
                name : cName,
                notes : [{
                    author : nAuth,
                    note : nName,
                    color : nColor
                }]
            }
            var uri = '/note/' + cName;
            data.updateNotes(note,function(err, result) {
                if (err) {
                    console.log("Error occured while inserting data controller");
                } else {
                    data.getNotesByName(cName,function(err,notes) {
                        if (err) {
                            console.log("error occured while gathering data with " + JSON.stringify(err));
                        } else {
                            resp.redirect(uri);
                        };
                    });
                }
            });
        });
        console.log("Note Controller initialized...");
    };
})(module.exports);