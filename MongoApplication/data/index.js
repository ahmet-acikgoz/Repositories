(function(data) {
    var seedData = require('./seedData');
    var database = require('./database');
    data.getNotes = function(next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                var notes = db.notes.find().toArray(function(err, notes) {
                    if (err) {
                        console.log("Error occure while retriving data from db");
                        next(err, null);
                    } else {
                        next(null, notes);
                    }
                });
            }
        });
    };
    data.insertCategory = function(noteName, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                var notes = db.notes.find({
                    name: noteName
                }).count(function(err, length) {
                    if (err) {
                        next(err, null);
                    } else {
                        if (length > 0) {
                            next("There is an item for this categoryName: " + noteName, null);
                        } else {
                            var noteObject = {
                                name: noteName,
                                notes: []
                            };
                            db.notes.insert(noteObject, function(err) {
                                if (err) {
                                    console.log("Error occured while inserting data");
                                    next(err, null);
                                } else {
                                    next(null, noteObject);
                                }
                            });
                        }
                    }
                });
            }
        });
    };

    data.getNotesByName = function(noteName, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                var note = db.notes.find({
                    name: noteName
                }).toArray(function(err, notes) {
                    if (err) {
                        console.log("Error occure while retriving data from db");
                        next(err, null);
                    } else {
                        next(null, notes);
                    }
                });
            }
        });
    };

    data.updateNotes = function(noteParam, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                // db.notes.findAndModify({
                //     query: { name: noteParam.name },
                //     update: { $inc: { notes : noteParam.notes } },
                //     upsert: true
                // });
                db.notes.update(
                   { name: noteParam.name },
                   {
                      "$push": {
                          "notes": {
                              "$each": noteParam.notes
                          }
                      }
                   }
                );
                next(null, noteParam);
            }
        });
        
    };

    function seedDatabase() {
        database.getDatabase(function(err, db) {
            if (err) {
                console.log("Error occured while getting db");
            } else {
                db.notes.find({}).count(function(err, length) {
                    if (err) {
                        console.log("Error occured while counting data");
                    } else {
                        if (length > 0) {
                            console.log("Db already seeded.");
                        } else {
                            seedData.initialNotes.forEach(function(item) {
                                db.notes.insert(item, function(err) {
                                    if (err) {
                                        console.log("Error occured while seeding db");
                                    }
                                })
                            });
                            console.log("Database seeded");
                        }
                    }
                });
            }
        });
    };
    seedDatabase();
})(module.exports);