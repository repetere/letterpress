/*
 * letterpress
 * http://github.com/typesettin/letterpress
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */

'use strict';

var classie = require('classie'),
	extend = require('util-extend'),
	events = require('events'),
	domhelper = require('domhelper'),
	util = require('util');

/**
 * A module that represents a letterpress.
 * @{@link https://github.com/typesettin/letterpress}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @module letterpress
 * @requires module:classie
 * @requires module:util-extent
 * @requires module:util
 * @requires module:events
 * @todo to do later
 */
var letterpress = function(config_options,letterpress_message,show,timed,callback){
	/** module default configuration */
	var options,
		defaults = {
			idSelector : '#_ltr_letterpress-element',
			inputNameValue : null,
			sourcedata : {},
			element : null,
			elementContainer : null,
			sourcetype : "object"
		},
		container;

	//extend default options
	options = extend( defaults,config_options );


	/** Returns the configuration object 
	 * @return {object} the module configuration
	 */
	this.config = function(){
		return options;
	};

	/** 
	 * The element to clone in child window
	 * @param {object} element - html element to clone
	 */
	this.setRibbonContentElement = function(element){
		options.element = element;
	};

	/**
	 * intialize a new platter
	 */
	this.init = function(callback){
		console.log("options.idSelector",options.idSelector);
		if(document.querySelector(options.idSelector)){
			options.element = document.querySelector(options.idSelector);
			if(!options.element.name){
				throw new Error("form element must have a name value");
			}
			else{
				options.inputNameValue = options.element.name;
				this.createContainer();
			}
		}
		else{
			throw new Error("invalid element selector");
		}
	}.bind(this);

	/**
	 * create letterpress html container
	 */
	this.createContainer = function(){
		var letterpressContainer = document.createElement('div'),
			ultagdivContainer = document.createElement('div'),
			lpCheckboxContainer = document.createElement('div'), //http://www.w3schools.com/jsref/dom_obj_checkbox.asp
			ulTagContainer = document.createElement('ul'),
			selectContainer = document.createElement('select');//http://www.w3schools.com/tags/tag_optgroup.asp

		/** set up input wrapper */
		letterpressContainer.setAttribute("class","_ltr_l-e-w");
		letterpressContainer.setAttribute("id",options.inputNameValue+"-dc");
		options.elementContainer = letterpressContainer;

		domhelper.elementWrap(options.element,options.elementContainer);

		/** set up input ul and taginput wrapper */
		ultagdivContainer.setAttribute("id",options.inputNameValue+"-dtulc");
		options.elementContainer.appendChild(ultagdivContainer);
		/** set up ul and li wrapper */
		ulTagContainer.setAttribute("id",options.inputNameValue+"-ulc");
		ultagdivContainer.appendChild(ulTagContainer);
		ultagdivContainer.appendChild(options.element);
		options.element.name=options.inputNameValue+"-i";

		/** set up select/optgrp wrapper */
		selectContainer.setAttribute("id",options.inputNameValue+"-sc");
		options.elementContainer.appendChild(selectContainer);

		/** set up checkbox wrapper */
		lpCheckboxContainer.setAttribute("id",options.inputNameValue+"-cbc");
		options.elementContainer.appendChild(lpCheckboxContainer);

		this.emit("letterpressContainerCreated",letterpressContainer);
	};

	/**
	 * create letterpress html
	 * @param {string} id name for platter selector id
	 */
	this.createRibbon = function(id){
		var letterpressHTML = (document.querySelector(id)) ? document.querySelector(id) : document.createElement('div');
		/** create platter tab html */
		classie.addClass(letterpressHTML,'_mms_letterpress-element');
		classie.addClass(letterpressHTML,'future');
		classie.addClass(letterpressHTML,options.style);
		letterpressHTML.innerHTML =options.message;
		/** add platter tab to tab bar */
		document.querySelector('#_mms_letterpress-element-wrapper').appendChild(letterpressHTML);
		this.emit("letterpressCreated",letterpressHTML);
	};


	var letterpressClickEventHandler = function(e){
		var etarget = e.target;
		if(classie.hasClass(etarget,'_rb-hide-letterpress')){
			this.hideRibbon();
		}
	}.bind(this);

	this.init();

	function callCallBack(callback){
		if(typeof callback ==='function'){
			callback();
		}
	}
};

util.inherits(letterpress,events.EventEmitter);

module.exports = letterpress;

// If there is a window object, that at least has a document property,
// define linotype
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.letterpress = letterpress;
}