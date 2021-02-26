const fs = require("fs");
module.exports = {
	name: 'reload',
	description: 'Reloads all commands.',
	cooldown: 5,
	execute(message, args) {
		console.log("Reloading commands and modules...");
		const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    const moduleFiles = fs.readdirSync("./modules").filter(file => file.endsWith(".js"));
    
		for (const file of commandFiles) {
			delete require.cache[require.resolve(`./${file}`)];
			const command = require(`../commands/${file}`);
			message.client.commands.set(command.name, command);
    }
      
    for (const file of moduleFiles) {
			delete require.cache[require.resolve(`../modules/${file}`)];
		}
	}
};