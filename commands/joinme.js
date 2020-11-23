module.exports = {
	name: "joinme",
	description: "Connects bot to a voice channel which you are on.",
	execute(message, args) {
		const voiceChannel = message.member.voice.channel;	
		if(voiceChannel) {
				voiceChannel.join().catch(console.log);
		} else {
			message.channel.send("You need to be connected to a voice channel!");
		}
	}
};