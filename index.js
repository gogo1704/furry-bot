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
cooldowns = new Discord.Collection();
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

    // check for pm
    if (message.guild === null && !command.allowPM) {
        return message.author.send("Command not allowed for PMs, sorry!");
    }

    // check for permissions
    if (message.guild != null) {
        const perm_list = message.channel.permissionsFor(message.guild.me).toArray();
        if (!perm_list.includes('SEND_MESSAGES')) return console.log("Insufficient permissions on channel "+message.channel.name);
    }


	// Check for required arguments
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments!`;
		if (command.usage) {
			reply += `\nUsage: \`${config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	// Check for cooldown
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.author.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// command handler
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("unexpected error!");
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

// CTRL+C listener
process.on("SIGINT", () => {
	console.log('Terminating...');
	process.exit(0);
})


// Destroy client before exiting
process.on("exit", () => {
	client.destroy();
	console.log('Process terminated');
})

// Login with token
initSteps++;
console.log(`\n[${initSteps}/${initMaxSteps}] Logging in...`)
client.login(config.token);
