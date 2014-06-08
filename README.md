letterpress
===========

ajax tag creation

todo:

take input, add wrapper, inside wrapper div have ul (container for tags) then new input for event handler

requires superagent for ajax

config
- input element
- source (either object or ajax)

div.wrapper
- ul.tagwrapper
- - li - tags (div, text, close button)
- input text (tag input)
- drop down div of tags options
- - new tag if empty
- hidden option group
- - selected tags, name is original input, option value(value is selected tag)

event listeners
- keypress on tag input
- - keydown on drop down over tag options
- - keydown (enter - select tag)
- - keydown (escape - cancel)

- click on tag x
- - removes tag from ul, also removes element from option group

- data needs to be array of options
[{_id:id, title:title}]