//javascript has access to the DOM
//Make use of code function and not the KeyCode as its been depracated

//initializing variables
var before = document.getElementById("before"); //anchor tag inside terminal div inside body
var liner = document.getElementById("liner"); //liner div that has the
var command = document.getElementById("typer");  //span element inside the 
var textarea = document.getElementById("texter"); //this is the text area which also has event handlers for the text
var terminal = document.getElementById("terminal"); //terminal div inside body div

//same here two but the variable names could be better
var git = 0;
var pw = false;
let pwd = false;
var commands = [];

//settimeout is a function that will run a function after a certain amount of time
setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);


window.addEventListener("keyup", enterKey);

//printing messages
console.log(
  "%cYou hacked my password!ðŸ˜ ",
  "color: #04ff00; font-weight: bold; font-size: 24px;"
);
console.log("%cPassword: '" + password + "' - I wonder what it does?ðŸ¤”", "color: grey");

//intialising text area
textarea.value = "";
command.innerHTML = textarea.value; //what is this about?

//function for when key is entered -- what is e - stands for event?
//function should be broken down - maybe use switch case
function enterKey(e) {

	//does not seem necessary here
  if (e.keyCode == 181) { 
    document.location.reload(true);
  }
  //this is all about a  password
//   if (pw) {
//     let et = "*";
//     let w = textarea.value.length;
//     command.innerHTML = et.repeat(w);
//     if (textarea.value === password) {
//       pwd = true;
//     }
//     if (pwd && e.keyCode == 13) {
//       loopLines(secret, "color2 margin", 120);
//       command.innerHTML = "";
//       textarea.value = "";
//       pwd = false;
//       pw = false;
//       liner.classList.remove("password");
//     } else if (e.keyCode == 13) {
//       addLine("Wrong password", "error", 0);
//       command.innerHTML = "";
//       textarea.value = "";
//       pw = false;
//       liner.classList.remove("password");
//     }
//   } else {
    if (e.keyCode == 13) //this is enter
	{
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("visitor@fkcodes.com:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) 
	{
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) 
	{
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
//   }
}

//function for commands and what is happening though?
//basically all the commands
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
      addLine("Opening GitHub...", "color2", 0);
      newTab(github);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

//this is the newTab function to open new window
function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

//not sure hows it working and what is happening
function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

//not sure
function loopLines(name, style, time) 
{
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}