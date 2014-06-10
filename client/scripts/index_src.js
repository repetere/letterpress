'use strict';

var letterpress = require('../../lib/letterpress'),
	letterpressapp = new letterpress({
		idSelector : '#tagbuilder',
		sourcedata : [{
					"_id":"asdsfsfhiphop",
					"title":"hip hop",
				},{
					"_id":"jdpa9s8edm",
					"title":"EDM",
				},{
					"_id":"asfdasd44",
					"title":"pop",
				},{
					"_id":"ljfhsa34oo",
					"title":"pop music",
				},{
					"_id":"ljfhs9f0jpoo",
					"title":"pops",
				},{
					"_id":"sdfckhunotcy",
					"title":"country",
				},{
					"_id":"sad8p9",
					"title":"classical",
				},{
					"_id":"s;8j;8c87c",
					"title":"rock",
				},{
					"_id":"ijdc89p8",
					"title":"jazz"
				},{
					"_id":"awfj90ew",
					"title":"progressive house"
				},{
					"_id":"fj08afdas",
					"title":"electronic"
				}]
	});

window.onload = function(){
	letterpressapp.init();
};

window.letterpressapp = letterpressapp;

letterpressapp.on("intializedLetterpress",function(data){
	console.log("loaded letterpress",data);
});