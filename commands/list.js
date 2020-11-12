module.exports = {
	name: "list",
	description: "Shows number of online people.",
	execute(message, args) {
		let a = message.guild.memberCount;
        // console.log(`returning ${a}`);
        message.channel.send(`This server has ${a} members on it!`);
	}
};
