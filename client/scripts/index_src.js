'use strict';

var letterpress = require('../../lib/letterpress'),
	letterpressapp;

window.onload = function(){
	letterpressapp = new letterpress({
		idSelector : '#tagbuilder'
	});
	window.letterpressapp = letterpressapp;

	letterpressapp.on("intializedLetterpress",function(data){
		console.log("loaded letterpress",data);
	});
};
