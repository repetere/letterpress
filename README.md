letterpress [![Build Status](https://travis-ci.org/typesettin/letterpress.svg?branch=master)](https://travis-ci.org/typesettin/letterpress) [![NPM version](https://badge.fury.io/js/letterpressjs.svg)](http://badge.fury.io/js/letterpressjs)
===========

ajax tag creation

ex local object:
-------
	var letterpress = require("letterpress");
	
	letterpresscb = new letterpress({
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
				}]
	});

	window.onload = function(){
		letterpresscb.init();
	};

ex json custom callback:
-------
	var letterpress = require("letterpress");
	
	var letterpresscb = new letterpress({
		idSelector : '#tagremotebuilder',
		sourcedata: 'http://local.getperiodic.com:8080/post/search',
		sourcearrayname: 'posts',
		createTagFunc:function(id,val,callback){
			console.log("creating tag in db");
			setTimeout(function(){
				console.log("db done");
				callback('idfromdb',val,err);
			},1000);
		}
	});

	window.onload = function(){
		letterpresscb.init();
	};


ex jsonp:
-------
	var letterpress = require("letterpress");
	
	var letterpresscb = new letterpress({
		idSelector : '#tagremotebuilder',
		sourcedata: 'http://local.getperiodic.com:8080/post/search?callback=jsonpcb',
		sourcearrayname: 'posts',
		sourcecallback: 'jsonpcb',
		sourcejsonp:true
	});

	window.onload = function(){
		letterpresscb.init();
	};