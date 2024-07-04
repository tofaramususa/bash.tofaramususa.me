//this is to get the element by id
function $(elid) {
    return document.getElementById(elid);
  }
  
var cursor;
window.onload = init; //this is to call the init function

//this is to initialize the cursor to 0px
function init() {
  cursor = $("cursor");
  cursor.style.left = "0px";
}

//this is to replace the new line with a space
function nl2br(txt) {
  return txt.replace(/\n/g, '');
}

//this is to type the text in the span area
function typeIt(from, e) {
  e = e || window.event;
  var w = $("typer");
  var tw = from.value; //take the value of the input
  if (!pw)
	{
    w.innerHTML = nl2br(tw); //take the new line add it to the inner html
  }
}

//this is the cursor movement of cursor based count/length of the text left
function moveIt(count, e) {
  e = e || window.event;
  var keycode = e.keyCode || e.which;
  if (keycode == 37 && parseInt(cursor.style.left) >= (0 - ((count - 1) * 10)))
	{
    cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
  } 
  else if (keycode == 39 && (parseInt(cursor.style.left) + 10) <= 0) {
    cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
  }
}
//this is to send an alert 
function alert(txt) {
  console.log(txt);
}