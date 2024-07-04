//get element by the id
function $(elementId)
{
	return document.getElementById(elementId)
}

var cursor;

window.onload = init //this is to call the init function when the window is loaded 

function init()
{
	cursor = $("cursor");
	cursor.style.left = "0px" //sets the cursor initially at the start
}

//this function is to remove the spaces from the text
function replaceSpaces(text)
{
	return text.replace(/\n/g, '');
}

//this to replace the new line with spaces 
function recordKey(element, e) 
{
	e = e || window.event;
	var inputDisplay = $("typer");
	var tempStr = element.value;
	inputDisplay.innerHTML = replaceSpaces(tempStr); //sets the text of type element and removes spaces
}

//this to move the cursor to the left or right based on the space
function moveCursor(count, e)
{
	e = e || window.event;
	var keycode = e.keyCode | e.which;
	if(keycode == 37 && parseInt(cursor.style.left) >= (0 - ((count - 1) * 10))) //when its a keypress
		{
			cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
		}
	else if(keycode == 39 && (parseInt(cursor.style.left) + 10) <= 0)
		{
			cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
		}
}

//this function is to alert the text
function alert(text)
{
	console.log(text)
}
