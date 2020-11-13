// Initialization
console.log("Initializing...");

// require
console.log("Requiring...");
const Discord = require("discord.js");
const fs = require("fs");

// config
const defaultConfig = require("./default-config.json");
const config = require("./local/config.json");

for (const setting in defaultConfig) {
	if(!config[setting]) {
		config[setting] = defaultConfig[setting];
	}
}

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.config = config;

// search for command files
console.log("Loading commands...");
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// ready
client.once("ready", () => {
	console.log("Ready");
});

// message listener
client.on("message", message => {
	// check if message is a command
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// check if command exists
	if (!client.commands.has(commandName)) return message.channel.send("Invalid command. Use \`;help\` to view list of commands.");

	const command = client.commands.get(commandName);

    // check for pm
    if (message.guild === null && !command.allowPM) {
        return message.author.send("Command not allowed for PMs, sorry!");
    }

    // check for permissions
    if (message.guild != null) {
        const perm_list = message.channel.permissionsFor(message.guild.me).toArray();
        if (!perm_list.includes('SEND_MESSAGES')) return console.log("Insufficient permissions on channel "+message.channel.name);
    }

	// check for required arguments
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments!`;
		if (command.usage) {
			reply += `\nUsage: \`${config.prefix}${command.name} ${command.usage}\``;
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

// member join listener
client.on("guildMemberAdd", member => {
	const channel = member.guild.channels.cache.get(config.welcomeChannelID);
	if (!channel) return;
		channel.send(`Welcome to the server, ${member}. Have fun!`)
			.catch(console.error);
});

// member remove listener
client.on("guildMemberRemove", member => {
	const channel = member.guild.channels.cache.get(config.welcomeChannelID);
	if (!channel) return console.log("no channel");
		channel.send(`${member} left us. We will miss him!`)
			.catch(console.error);
});

		

// login
console.log("Logging in...")
client.login(config.token);
