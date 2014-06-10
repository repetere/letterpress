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
	//jsonp
	// var letterpressremoteapp = new letterpress({
	// 	idSelector : '#tagremotebuilder',
	// 	sourcedata: 'http://local.getperiodic.com:8080/post/search?callback=jsonpcb',
	// 	sourcearrayname: 'posts',
	// 	sourcecallback: 'jsonpcb',
	// 	sourcejsonp:true
	// });
	//json + custom callback
	var letterpressremoteapp = new letterpress({
		idSelector : '#tagremotebuilder',
		sourcedata: 'http://local.getperiodic.com:8080/post/search',
		sourcearrayname: 'posts',
		createTagFunc:function(id,val,callback){
			//do db stuff
			// console.log("couldn't create tag");
			// callback(null,null,new Error("couldnt create in db"));
			console.log("creating tag in db");
			setTimeout(function(){
				console.log("db done");
				callback('idfromdb',val);
			},1000);
		}
	});

window.onload = function(){
	letterpressapp.init();
	letterpressremoteapp.init();
};

window.letterpressapp = letterpressapp;

letterpressapp.on("intializedLetterpress",function(data){
	console.log("loaded letterpress",data);
});