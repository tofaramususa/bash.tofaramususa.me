// terminal.js

class Terminal {
    constructor(config) {
        this.elements = {
            terminal: $(config.terminalId),
            output: $(config.outputId),
            input: $(config.inputId),
            prompt: $(config.promptId),
            cursor: $(config.cursorId)
        };
        this.config = {
            promptString: config.promptString || 'visitor@website:~$ ',
            welcomeMessage: config.welcomeMessage || 'Welcome to the terminal. Type "help" for a list of commands.',
            maxHistoryLength: config.maxHistoryLength || 100
        };
        this.state = {
            commandHistory: [],
            historyIndex: -1,
            cursorPosition: 0
        };
        this.commandHandlers = new Map();
        this.initialize();
    }

    initialize() {
        this.elements.prompt.textContent = this.config.promptString;
        this.elements.input.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.elements.input.addEventListener('input', this.handleInput.bind(this));
        this.addLine(this.config.welcomeMessage);
        this.focusInput();
        this.initializeCursor();
    }

    initializeCursor() {
        this.elements.cursor.style.left = "0px";
    }

    registerCommand(name, handler, description) {
        this.commandHandlers.set(name, { handler, description });
    }

    handleKeyDown(event) {
        switch(event.key) {
            case 'Enter':
                this.handleEnter();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.navigateHistory(1);
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                this.moveCursor(event);
                break;
            case 'Tab':
                event.preventDefault();
                this.autocomplete();
                break;
        }
    }

    handleInput(event) {
        this.updateDisplay();
    }

    handleEnter() {
        const command = this.elements.input.value.trim();
        this.addLine(`${this.config.promptString}${command}`);
        this.executeCommand(command);
        this.state.commandHistory.push(command);
        if (this.state.commandHistory.length > this.config.maxHistoryLength) {
            this.state.commandHistory.shift();
        }
        this.state.historyIndex = this.state.commandHistory.length;
        this.elements.input.value = '';
        this.state.cursorPosition = 0;
        this.updateCursorPosition();
    }

    navigateHistory(direction) {
        const newIndex = this.state.historyIndex + direction;
        if (newIndex >= 0 && newIndex <= this.state.commandHistory.length) {
            this.state.historyIndex = newIndex;
            this.elements.input.value = this.state.commandHistory[newIndex] || '';
            this.state.cursorPosition = this.elements.input.value.length;
            this.updateCursorPosition();
            this.updateDisplay();
        }
    }

    moveCursor(event) {
        const keycode = event.keyCode || event.which;
        const inputLength = this.elements.input.value.length;
        
        if (keycode === 37 && this.state.cursorPosition > 0) {
            this.state.cursorPosition--;
        } else if (keycode === 39 && this.state.cursorPosition < inputLength) {
            this.state.cursorPosition++;
        }
        
        this.updateCursorPosition();
    }

    updateCursorPosition() {
        this.elements.cursor.style.left = (this.state.cursorPosition * 10) + "px";
    }

    autocomplete() {
        const input = this.elements.input.value;
        const possibilities = Array.from(this.commandHandlers.keys())
            .filter(cmd => cmd.startsWith(input));
        
        if (possibilities.length === 1) {
            this.elements.input.value = possibilities[0];
            this.state.cursorPosition = possibilities[0].length;
            this.updateCursorPosition();
            this.updateDisplay();
        } else if (possibilities.length > 1) {
            this.addLine(possibilities.join('  '));
        }
    }

    executeCommand(command) {
        const [cmd, ...args] = command.split(' ');
        if (this.commandHandlers.has(cmd)) {
            this.commandHandlers.get(cmd).handler(args);
        } else {
            this.addLine(`Command not found: ${cmd}. Type "help" for a list of commands.`);
        }
    }

    addLine(text, className = '') {
        const line = document.createElement('div');
        line.textContent = text;
        line.className = className;
        this.elements.output.appendChild(line);
        this.elements.output.scrollTop = this.elements.output.scrollHeight;
    }

    updateDisplay() {
        const w = $("typer");
        w.innerHTML = this.removeSpaces(this.elements.input.value);
    }

    removeSpaces(text) {
        return text.replace(/\n/g, '');
    }

    focusInput() {
        this.elements.input.focus();
    }

    clear() {
        this.elements.output.innerHTML = '';
    }
}

// Utility functions
function $(elementId) {
    return document.getElementById(elementId);
}

function alert(text) {
    console.log(text);
}

// usage.js

document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal({
        terminalId: 'terminal',
        outputId: 'terminal-output',
        inputId: 'terminal-input',
        promptId: 'terminal-prompt',
        cursorId: 'cursor',
        promptString: 'visitor@tofaramususa.me:~$ ',
        welcomeMessage: 'Welcome to Tofara Mususa\'s terminal website. Type "help" for available commands.'
    });

    terminal.registerCommand('help', () => {
        const commands = Array.from(terminal.commandHandlers.entries())
            .map(([name, { description }]) => `${name.padEnd(15)} - ${description}`)
            .join('\n');
        terminal.addLine('Available commands:\n' + commands);
    }, 'Display this help message');

    terminal.registerCommand('clear', () => {
        terminal.clear();
    }, 'Clear the terminal screen');

    terminal.registerCommand('about', () => {
        terminal.addLine('This is a terminal-style website created by Tofara Mususa.');
        terminal.addLine('It showcases interactive command-line interface in a web browser.');
    }, 'Display information about this website');

    terminal.registerCommand('contact', () => {
        terminal.addLine('You can reach Tofara Mususa at:');
        terminal.addLine('Email: example@email.com');
        terminal.addLine('LinkedIn: linkedin.com/in/tofaramususa');
        terminal.addLine('GitHub: github.com/tofaramususa');
    }, 'Show contact information');

    // Add more commands as needed
});

