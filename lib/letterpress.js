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
			sourcetype : "object",
			nameLabel: "_id",
			searchquery: "",
			valueLabel: "title"
		},
		container;

	//extend default options
	options = extend( defaults,config_options );
	options.lastddcount = 1;
	options.currentddcount = 1;


	/** Returns the configuration object 
	 * @return {object} the module configuration
	 */
	this.config = function(){
		return options;
	};

	/**
	 * intialize a new platter
	 */
	this.init = function(callback){
		if(document.querySelector(options.idSelector)){
			options.element = document.querySelector(options.idSelector);
			if(!options.element.name){
				throw new Error("form element must have a name value");
			}
			else{
				options.inputNameValue = options.element.name;
				this.createContainer();
				if(options.sourcetype ==='objcet' && typeof options.sourcedata !== "array"){
					throw new Error("object must be an array of objects");
				}
				else{
					this.updateSelectOptionsHTML();
					this.attachEventListeners();
					this.emit("intializedLetterpress",true);
				}
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
			inputLiContainer = document.createElement('li'),
			selectContainer = document.createElement('select');//http://www.w3schools.com/tags/tag_optgroup.asp

		/** set up input wrapper */
		letterpressContainer.setAttribute("class","_ltr_l-e-w");
		letterpressContainer.setAttribute("id",options.inputNameValue+"-dc");
		options.elementContainer = letterpressContainer;

		domhelper.elementWrap(options.element,options.elementContainer);

		/** set up input ul and taginput wrapper */
		ultagdivContainer.setAttribute("id",options.inputNameValue+"-dtulc");
		ultagdivContainer.setAttribute("class","_ltr-dtulc");
		options.elementContainer.appendChild(ultagdivContainer);
		/** set up select/optgrp wrapper */
		selectContainer.setAttribute("id",options.inputNameValue+"-sc");
		selectContainer.setAttribute("name",options.inputNameValue+"-sc");
		selectContainer.setAttribute("class","_ltr-sc");
		options.elementContainer.appendChild(selectContainer);
		options.selectContainer = selectContainer;
		/** set up ul and li wrapper */
		ulTagContainer.setAttribute("id",options.inputNameValue+"-ulc");

		inputLiContainer.appendChild(options.element);
		inputLiContainer.setAttribute("class","_ltr-taglistyle _ltr-li-wrapper");
		ultagdivContainer.appendChild(inputLiContainer);

		ulTagContainer.setAttribute("class","_ltr-ulc");
		ultagdivContainer.appendChild(ulTagContainer);
		options.ulTagContainer = ulTagContainer;
		options.element.name=options.inputNameValue+"-i";

		/** set up checkbox wrapper */
		lpCheckboxContainer.setAttribute("id",options.inputNameValue+"-cbc");
		lpCheckboxContainer.setAttribute("class","_ltr-cbc");
		options.elementContainer.appendChild(lpCheckboxContainer);
		options.lpCheckboxContainer = lpCheckboxContainer;

		this.emit("letterpressContainerCreated",letterpressContainer);
	};

	/**
	 * create letterpress html
	 * @param {string} id name for platter selector id
	 */
	this.setDataObject = function(obj){
		if(typeof obj !== "array"){
			throw new Error("object must be an array of objects");
		}
		else{
			options.sourcedata = obj;
		}
	};

	/**
	 * creates select dropdown with tags from source data
	 * @param {string} id name for platter selector id
	 */
	this.updateSelectOptionsHTML = function(){
		var selectOptionHTML ='',
			searchRegEx = new RegExp('^'+options.searchquery, "i");
		options.numOfOptions = 0;
		options.lastddcount = options.currentddcount;


		selectOptionHTML += '<option value="SELECT" selected=seleted disabled=disabled>Select Tag</option>';
		for(var x in options.sourcedata){
			if(options.sourcedata[x][options.valueLabel].match(searchRegEx) && options.searchquery.length >0){
				selectOptionHTML += '<option value="'+options.sourcedata[x][options.nameLabel]+'" label="'+options.sourcedata[x][options.valueLabel]+'">'+options.sourcedata[x][options.valueLabel]+'</option>';
				options.numOfOptions++;
			}
		}
		selectOptionHTML += '<option value="NEWTAG">Create Tag</option>';
		options.selectContainer.innerHTML = selectOptionHTML;
		options.currentddcount = options.selectContainer.length;
		this.emit("updatedSelectOptions");
	};

	/**
	 * create letterpress html
	 * @param {string} id name for platter selector id
	 */
	this.createTag = function(id,value){
		var searchterm = options.searchquery,
			liToInsert = document.createElement('li'),
			checkboxToInsert = document.createElement('input');
		options.searchquery = '';
		options.element.value = '';

		liToInsert.id="lp-li_"+id;
		liToInsert.innerHTML=value+' <span class="lp-s-removeTag" data-id="'+id+'">[x]</span>';
		checkboxToInsert.id="lp-cbx_"+id;
		checkboxToInsert.name=options.inputNameValue;
		checkboxToInsert.value=id;
		checkboxToInsert.type="checkbox";
		checkboxToInsert.setAttribute("checked","checked");
		checkboxToInsert.innerHTML=value;
		if(options.ulTagContainer.innerHTML.match(id)){
			console.log("already added");
		}
		else{
			options.ulTagContainer.appendChild(liToInsert);
			options.lpCheckboxContainer.appendChild(checkboxToInsert);
			classie.addClass(liToInsert,"showli");
			this.updateSelectOptionsHTML();
		}
	}.bind(this);

	this.removeTag = function(id){
		domhelper.removeElement(document.getElementById('lp-cbx_'+id));
		domhelper.removeElement(document.getElementById('lp-li_'+id));
	}.bind(this);

	this.attachEventListeners = function(){
		options.element.addEventListener("keyup", letterpressInputKeydownEventHandler,false);
		options.selectContainer.addEventListener("change",letterpressSelectChangeEventHandler,false);
		options.selectContainer.addEventListener("select",letterpressSelectChangeEventHandler,false);
		options.selectContainer.addEventListener("keyup",letterpressSelectKeydownEventHandler,false);
		options.selectContainer.addEventListener("click",letterpressClickSelect,false);
		options.ulTagContainer.addEventListener("click",letterpressClickUL,false);
	};

	var letterpressInputKeydownEventHandler = function(e){
		var etarget = e.target;
			options.searchquery = etarget.value;

		this.updateSelectOptionsHTML();
		if (e.keyCode === 13 ) {
			if(options.numOfOptions>0){
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				options.selectContainer.dispatchEvent(evt);
			}
			else{
				console.log("options.numOfOptions",options.numOfOptions,"create tag");
			}
			console.log("enter press");
		}
	}.bind(this);

	var letterpressSelectKeydownEventHandler = function(e){
		if (e.keyCode === 13 ) {
			options.element.focus();
			console.log("enter press on select drop down");
		}
	}.bind(this);

	var letterpressSelectChangeEventHandler = function(e){
		console.log("select drop down value change");
		this.createTag( options.selectContainer.value, document.querySelector("#"+options.selectContainer.id+" option[value="+options.selectContainer.value+"]").innerHTML);
	}.bind(this);

	var letterpressSelectSelectEventHandler = function(e){
		console.log("val select");
	}.bind(this);

	var letterpressClickSelect = function(e){
		console.log("select clicked");
	};

	var letterpressClickUL = function(e){
		var etarget = e.target;
		if(classie.hasClass(etarget,"lp-s-removeTag")){
			this.removeTag(etarget.getAttribute("data-id"));
		}
	}.bind(this);

	// this.init();

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