module.exports = {
	name: "help",
	description: "Lists all commands or show specific information about a command",
	usage: "[command name]",
    allowPM: true,
	execute(message, args) {

		const prefix = message.client.config.prefix;
		const data = [];
		const {commands} = message.client;

		if (!args.length) {
			data.push("List of commands:");
			data.push(`\`${commands.map(command => command.name).join(", ")}\``);
			data.push("You can get info on a specific command using `help <command name>`.");
			message.channel.send(data, { split: true });
		} else {
			const name = args[0].toLowerCase()
			const command = commands.get(name);
			message.channel.send(new Discord.MessageEmbed(command.usage));
		}
		/*const prefix = message.client.config.prefix;
		const data = [];
		const {commands} = message.client;

		
		} else {
			const name = args[0].toLowerCase()
			const command = commands.get(name);

			if (!command) {
				return message.channel.send("Invalid command!");
			}

			if (command.name) data.push(`**Name:** \`${command.name}\``);
			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);
			message.channel.send(data, { split: true });
			
		}*/
	}
};
