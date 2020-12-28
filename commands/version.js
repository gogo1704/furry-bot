module.exports = {
	name: "version",
	description: "Get version of discord.js and node.js that bot is running on.",
    allowPM: true,
	execute(message, args) {
		message.channel.send(`Discord.js: ${Discord.version} # Node.js: ${process.version}`);
	}
};
