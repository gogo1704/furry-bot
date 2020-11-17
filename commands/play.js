const fs = require("fs");
module.exports = {
	name: "play",
	description: "Plays audio file.",
	args: true,
	usage: "<path | url>",
	execute(message, args) {
		const connection = message.guild.me.voice.connection
		async function play(voiceChannel) {
			try {
				//const stream = await fs.createReadStream("meme.mp3");
				const dispatcher = connection.play(args.join(" "), {volume: 0.5});
			} catch(error) {
				console.error(error);
			}
		}
		play(message.guild.me.voice.channel);
	}
};