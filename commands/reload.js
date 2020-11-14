const fs = require("fs");
module.exports = {
	name: 'reload',
	description: 'Reloads all commands.',
	cooldown: 5,
	execute(message, args) {
		console.log("Reloading commands...");
		const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
		for (const file of commandFiles) {
			delete require.cache[require.resolve(`./${file}`)];
			const command = require(`../commands/${file}`);
			message.client.commands.set(command.name, command);
		}
	}
};