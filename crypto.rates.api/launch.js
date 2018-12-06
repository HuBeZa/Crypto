const Bootstrap = require('./services/bootstrap');

const availableCommands = Bootstrap.getAvailableCommands();

const commandName = (process.argv[2] || '').toLowerCase();
if (!commandName || !availableCommands.includes(commandName)) {
  console.error(`Please specify a command: ${availableCommands.join('|')}`);
  return;
}

const bootstrap = new Bootstrap();
const command = bootstrap[commandName];

if (typeof(command) !== "function") {
  console.error(`Unexpected error: method '${commandName}' not found!`)
}

const result = command();
if (result instanceof Promise) {
  result
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}