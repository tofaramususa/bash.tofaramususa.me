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
  asyncDisplayLines(introCommand, "", 100);
  textArea.focus();
}, 80);

window.addEventListener("keyup", keyEvent); //whenever the key is presses record the key press

textArea.value = "";
inputDisplay.innerHTML = textArea.value;

function keyEvent(e) {
  if (e.keyCode == ENTER) {
    //this is when you press enter
    commandHistory.push(inputDisplay.innerHTML);
    index = commandHistory.length;
    asyncPrintLine("root@tofaramususa.me:~$ " + inputDisplay.innerHTML, "no-animation", 0);
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
	var command = cmd.trim();
  switch (command.toLowerCase()) {
	case "":
		break;
    case "help":
      asyncDisplayLines(helpCommand, "color2 margin", 80);
      break;
    case "clear":
		setTimeout(function() {
			terminal.innerHTML = '<a id="before"></a>';
			before = document.getElementById("before");
		  }, 1);
		  break;
	case "about":
		asyncDisplayLines(about, "color2 margin", 80);
		break;
	case "socials":
		asyncDisplayLines(socials, "color2 margin", 80);
		break;
	case "history":
		asyncDisplayLines(commandHistory, "color2 margin", 80);
		break;
	case "projects":
		asyncDisplayLines(projects, "color2 margin", 80);
		break;
	case "skills":
		asyncDisplayLines(skills, "color2 margin", 80);	
		break;
	case "education":
		asyncDisplayLines(education, "color2 margin", 80);	
		break;
	case "code":
		asyncPrintLine("Opening Github Repo...", "color2", 80);	
		openNewTab(code);
		break;
	case "github":
		asyncPrintLine("Opening Github Profile...", "color2", 80);	
		openNewTab(github);
		break;
	case "email":
		asyncPrintLine("Opening email...", "color2", 80);	
		openNewTab(email);
		break;	
	case "instagram":
		asyncPrintLine("Opening IG profile...", "color2", 80);	
		openNewTab(instagram);
		break;	
	case "linkedin":
		asyncPrintLine("Opening Linkedin profile...", "color2", 80);	
		openNewTab(linkedin);
		break;	
    default:
      asyncPrintLine("Command not found. For a list of commands enter <span class=\"command\">'help' </span>", "color2 margin", 80);
  }
}

function openNewTab(link) {
  setTimeout(() => {
    window.open(link, "_blank");
  }, 1500);
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
    before.parentNode.insertBefore(next, before);
    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function asyncDisplayLines(name, style, time) {
  name.forEach(function (item, index) {
    asyncPrintLine(item, style, index * time);
  });
  tempCounter = 0;
}
