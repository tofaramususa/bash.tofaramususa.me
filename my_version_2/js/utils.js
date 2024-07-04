function $(elementId)
{
	return document.getElementById(elementId)
}

var cursor;

window.onload = init 

function init()
{
	cursor = $("cursor");
	cursor.style.left = "0px" //sets the cursor initially at the start
}

function removeSpaces(text)
{
	return text.replace(/\n/g, '');
}

function recordKey(from, e) 
{
	e = e || window.event;
	var w = $("typer");
	var tw = from.value;
	w.innerHTML = removeSpaces(tw);
}

function moveIt(count, e)
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

function alert(text)
{
	console.log(text)
}
