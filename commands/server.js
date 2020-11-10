module.exports = {
    name: "server",
    description: "Shows server informations.",
    execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\n
		Server names acronym: ${message.guild.nameAcronym}\n
		Total members: ${message.guild.memberCount}\n
		Server creation data: ${message.guild.createdAt}\n
		Server region: ${message.guild.region}\n
		Server owner: ${message.guild.owner}\n
		Channel available: ${message.guild.channels}\n
		Emojis: ${message.guild.emojis}\n
		My name: ${message.guild.me}\n`);
  }
};