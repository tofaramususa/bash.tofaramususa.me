// main function
var before = getElemenetById("before");
var liner = getElemenetById("liner");
var command = getElemenetById("typer");
var textarea = getElemenetById("texter");
var terminal = getElemenetById("terminal");
var before = getElemenetById("before");

var git = 0;
var pw = false;
var pwd = false;
var commands = [];

setTimeout(function() 
{
	loopLines(banner, "", 80);
	textarea.focus();
}, 100);

window.addEventListener("keyup", keyEvent); //whenever the key is presses record the key press


textarea.value = ""
command.innerHTML = textarea.value

function keyEvent(e)
{
	if(e.keyCode == 13) //this is when you press enter
		{
			commands.push(command.innerHTML);
			git = commands.length;
			addLine("visitor@tofaramususa.me " + command.innerHTML, "no-animation", 0);
			command.innerHTML = "";
			textarea.value = "";
		}
	if(e.keyCode == 38 && git != 0) //this is when you press backspace
		{
			git -= 1;
			textarea.value = commands[git]; //why is it textarea
			command.innerHTML = commands[git];
		}
	if(e.keyCode == 40 && git != commands.length) //this is when you press down
	{
		git += 1;
		if(commands[git] === undefined)
		{
			textarea.value = "";
		}
		else
		{
			textarea.value = commands[git];
		}
		command.innerHTML = commands[git];
	}
}


//this is where we have the commands and we add them
function commander(cmd)
{
	switch(cmd.toLowerCase())
	{
		case "help":
			loopLines(help, "color2 margin", 80);
			break;
		case "more":
			addLine(help, "color2 margin", 80); //the information, the styles and the speed of animation
			// newTab()
			break
	}
}

function newTab(link)
{
	setTimeout(() => {
		window.open(link,"_blank");
	}, 500);
}

function addLine(text, style, time)
{
	var t = ""
	for(let i = 0; i < text.length; i++)
		{
			if (text.charAt(i) == " " && text.charAt(i + 1) == " ")
				{
					t += "&nbsp;&nbsp"
					i++
				}
			else
			{
				t += text.charAt(i);
			}
		}
	setTimeout(function(){
		var next = document.createElement("p")
		next.innerHTML = t;
		next.className = style;
		before.parentNode.insertBefore(next, before);
		window.scrollTo(0, document.body.offsetHeight);
	}, time);
}


function loopLines(name, style, time)
{
	name.forEach(function(item, index)
	{
		addLine(item, style, index * time)
	});
}