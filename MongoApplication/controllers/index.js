(function(controller) {
	
	var homeController=require('./homeController');
	var notesController=require('./notesController');

	controller.initializeControllers=function(expressApp) {
		console.log("Controllers initializing...");
		homeController.init(expressApp);	
		notesController.init(expressApp);
		console.log("Controllers initialized...");
	};

})(module.exports);