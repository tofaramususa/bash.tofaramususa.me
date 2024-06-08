// this is a function to get the element by id the name is a dollar sign that makes it seem like jquery
function $(elid) {
    return document.getElementById(elid);
  }

//variable
var cursor;
//what is window onload??
window.onload = init;

//init is the function and not sure what it does
function init() {
  cursor = $("cursor"); //getting the element by id
  cursor.style.left = "0px";	//puting style on the element
}

//not sure here
function nl2br(txt) {
  return txt.replace(/\n/g, '');
}

//not sure here
function typeIt(from, e) {
  e = e || window.event;
  var w = $("typer");
  var tw = from.value;
  if (!pw){
    w.innerHTML = nl2br(tw); //calls the above function
  }
}

//what is this function for? 
function moveIt(count, e) {
  e = e || window.event;
  var keycode = e.keyCode || e.which;
  if (keycode == 37 && parseInt(cursor.style.left) >= (0 - ((count - 1) * 10))) {
    cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
  } else if (keycode == 39 && (parseInt(cursor.style.left) + 10) <= 0) {
    cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
  }
}
//this is a function to log in the text
function alert(txt) {
  console.log(txt);
}

//not sure what the init function is for?
function init() {
  cursor = $("cursor");
  cursor.style.left = "0px";

  var textarea = $("texter"); // assuming "typer" is the id of your textarea
  textarea.addEventListener('blur', function() {
    this.placeholder = "Click here to enter command";
  });
}