module.exports = {
	name: "disconnect",
	description: "Disconects bot a bot from a voice channel",
	execute(message, args) {
		const connection = message.guild.me.voice.connection
		console.log(message.guild.me.voice);
		if(message.guild.me.voice) {
			connection.disconnect();
		} else {
			message.channel.send("I'm not connected to any voicechats");
		}
	}
};
