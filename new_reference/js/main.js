var before = document.getElementById("before");
var liner = document.getElementById("liner");
var typer_id = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var index = 0;
var pw = false;
let pwd = false;
var commands = [];

//this is to get at the start,
setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey); //this is to listen for keyup events and then run the enterKey function

console.log(
  "%cYou hacked my password!ðŸ˜ ",
  "color: #04ff00; font-weight: bold; font-size: 24px;"
);
console.log("%cPassword: '" + password + "' - I wonder what it does?ðŸ¤”", "color: grey");

//init
textarea.value = ""; //starts as empty string
typer_id.innerHTML = textarea.value; //okay so this sets the inner thml to the textarea value

function enterKey(e) {
  if (e.keyCode == 181) 
	{
    document.location.reload(true); //reload the page
  }
  if (pw) { //if the password is true
    let et = "*";
    let w = textarea.value.length;
    typer_id.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(secret, "color2 margin", 120);
      typer_id.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong password", "error", 0);
      typer_id.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else 
  {
	
    if (e.keyCode == 13)  //this is when the element is pressed
		{
      commands.push(typer_id.innerHTML); //adds to list of commands
      index = commands.length; //gets the total commands
      addLine("visitor@fkcodes.com:~$ " + typer_id.innerHTML, "no-animation", 0); //this adds a 
      commander(typer_id.innerHTML.toLowerCase()); //executes the command
      typer_id.innerHTML = ""; //sets the typer_id to empty and is executed first 
      textarea.value = ""; //sets it to empty string
    }
	//this is for the up and down arrow keys
    if (e.keyCode == 38 && index != 0) {
      index -= 1;
      textarea.value = commands[index];
      typer_id.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && index != commands.length) {
      index += 1;
      if (commands[index] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[index];
      }
      typer_id.innerHTML = textarea.value;
    }
  }
}

//this is the command executor that based on input will execute a command 
function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "whoami":
      loopLines(whoami, "color2 margin", 80);
      break;
    case "video":
      addLine("Opening YouTube...", "color2", 80);
      newTab(youtube);
      break;
    case "sudo":
      addLine("Oh no, you're not admin...", "color2", 80);
      setTimeout(function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000); 
      break;
    case "social":
      loopLines(social, "color2 margin", 80);
      break;
    case "secret":
      liner.classList.add("password");
      pw = true;
      break;
    case "projects":
      loopLines(projects, "color2 margin", 80);
      break;
    case "password":
      addLine("<span class=\"inherit\"> Lol! You're joking, right? You\'re gonna have to try harder than that!ðŸ˜‚</span>", "error", 100);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "email":
      addLine('Opening mailto:<a href="mailto:forrest@fkcodes.com">forrest@fkcodes.com</a>...', "color2", 80);
      newTab(email);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    // socials
    case "youtube":
      addLine("Opening YouTube...", "color2", 80);
      newTab(youtube);
      break;
    case "twitter":
      addLine("Opening Twitter...", "color2", 0);
      newTab(twitter);
      break;
    case "linkedin":
      addLine("Opening LinkedIn...", "color2", 0);
      newTab(linkedin);
      break;
    case "instagram":
      addLine("Opening Instagram...", "color2", 0);
      newTab(instagram);
      break;
    case "github":
      addLine("Opening github...", "color2", 0);
      newTab(github);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

//open a new tab after 500ms
function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

//
function addLine(text, style, time) {
  var t = "";
  //replace the spaces with html space characters in this loop
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ")
		{
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  //then for the time indicated, create a new p element
  //add the text and style to the element and then 
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time); //scroll the bottom of the page in set time time
}

//for each line in name array, add the line, with style
function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}