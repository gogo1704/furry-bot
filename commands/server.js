module.exports = {
    name: "server",
    description: "Shows server informations.",
    execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}
		Server names acronym: ${message.guild.nameAcronym}
		Total members: ${message.guild.memberCount}
		Server creation data: ${message.guild.createdAt}
		Server region: ${message.guild.region}
		Server owner: ${message.guild.owner}
		Channel available: ${message.guild.channels}
		Emojis: ${message.guild.emojis}
		My name: ${message.guild.me}`);
  }
};