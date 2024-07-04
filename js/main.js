// main function
var liner = document.getElementById("liner");
var inputDisplay = document.getElementById("typer");
var textArea = document.getElementById("texter");
var terminal = document.getElementById("terminal");
var before = document.getElementById("before");

var index = 0;
var commandHistory = [];
var ENTER = 13;
var tempCounter = 0;

setTimeout(function () {
  asyncDisplayLines(introCommand, "", 50);
  textArea.focus();
}, 50);

window.addEventListener("keyup", keyEvent); //whenever the key is presses record the key press

textArea.value = "";
inputDisplay.innerHTML = textArea.value;

function keyEvent(e) {
  if (e.keyCode == ENTER) {
    //this is when you press enter
    commandHistory.push(inputDisplay.innerHTML);
    index = commandHistory.length;
    asyncPrintLine("user@tofaramususa.me:~$ " + inputDisplay.innerHTML, "no-animation", 0);
    executeCommand(inputDisplay.innerHTML.toLowerCase());
    inputDisplay.innerHTML = "";
    textArea.value = "";
  }
  if (e.keyCode == 38 && index != 0) {
    //this is when you press backspace
    index -= 1;
    textArea.value = commandHistory[index]; //why is it textArea
    inputDisplay.innerHTML = commandHistory[index];
  }
  if (e.keyCode == 40 && index != commandHistory.length) {
    //this is when you press down
    index += 1;
    if (commandHistory[index] === undefined) {
      textArea.value = "";
    } else {
      textArea.value = commandHistory[index];
    }
    inputDisplay.innerHTML = textArea.value;
  }
}

//this is where we have the commandHistory and we add them
function executeCommand(cmd) {
  switch (cmd) {
    case "help":
      asyncDisplayLines(helpCommand, "color2 margin", 80);
      break;
    case "more":
      asyncDisplayLines(helpCommand, "color2 margin", 80); //the information, the styles and the speed of animation
      break;
    default:
      asyncPrintLine("Command not found: " + cmd + "<br>", "color2 margin", 80);
  }
}

function openNewTab(link) {
  setTimeout(() => {
    window.open(link, "_blank");
  }, 500);
}

function asyncPrintLine(text, style, time) {
  var new_text = "";

  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      new_text += "&nbsp;&nbsp";
      i++;
    } else {
      new_text += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = new_text;
    next.className = style;
	if(style === "")
	{
		next.style.fontSize = "0.4em"
		next.style.textShadow = "0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700";
		next.style.color = "#FFA500";
	}
    before.parentNode.insertBefore(next, before);
    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function asyncDisplayLines(name, style, time) {
  name.forEach(function (item, index) {
	if(index === 45)
	{
		style = " ";
	}
    asyncPrintLine(item, style, index * time);
  });
  tempCounter = 0;
}
