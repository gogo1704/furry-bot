// Initialization
console.log("Initializing...");

// require
console.log("Requiring...");
const fs = require("fs");
const {prefix,token} = require("./config.json");
const Discord = require("discord.js");


const client = new Discord.Client();
client.commands = new Discord.Collection();


// search for command files
console.log("Searching for commands...");
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// ready
client.once("ready", () => {
	console.log("Ready");
});

// message response
client.on("message", message => {
	// check if message is a command
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// check if command exists
	if (!client.commands.has(commandName)) return client.commands.get("help").execute(message,"");

	const command = client.commands.get(commandName);
	// check for required arguments
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments!`;
		if (command.usage) {
			reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// command handler
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("Unexpected error.");
	}
	
});
console.log("Logging in...")
client.login(token);