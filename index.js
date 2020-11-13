// Initialization
let initSteps = 1;		// Steps
const initMaxSteps = 6;		// Max steps

console.log(`\n[${initSteps}/${initMaxSteps}] Initializing...\n`);

// Reading map with require() entries and loading them...
const req = new Map();
req.set("Discord", "discord.js");
req.set("fs", "fs");
req.set("defaultConfig", "./default-config.json");
req.set("config", "./local/config.json");

req.forEach(function (value, key)  {
	 console.log(`Requiring ${value} as ${key}...`);
	 eval(`${key} = require(\"${value}\")`);
});

// If setting doesn't exist in config, load from default config
initSteps++;
console.log(`\n[${initSteps}/${initMaxSteps}] Reading config files...`);
for (const setting in defaultConfig) {
	if(!config[setting]) {
		console.log(`${setting} not found in config. Loading from default...`)
		config[setting] = defaultConfig[setting];
	}
}

// Create client objects
initSteps++;
console.log(`\n[${initSteps}/${initMaxSteps}] Creating client objects...`);
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.config = config;

// Search for command files
initSteps++;
console.log(`\n[${initSteps}/${initMaxSteps}] Loading commands...`);
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(`  ${file},`);
}

// When ready to work 
client.once("ready", () => {
	initSteps++;
	console.log(`[${initSteps}/${initMaxSteps}] Ready!`);
});

// Listen for messages
client.on("message", message => {
	// Check if message is a command
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Check if command exists
	if (!client.commands.has(commandName)) return message.channel.send("Invalid command. Use \`;help\` to view list of commands.");

	const command = client.commands.get(commandName);
	// Check for required arguments
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

		

// Login with token
initSteps++;
console.log(`\n[${initSteps}/${initMaxSteps}] Logging in...`)
client.login(config.token);
