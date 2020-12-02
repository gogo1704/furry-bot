module.exports = {
	name: "up",
	description: "Execute command above once again.",
    allowPM: true,
    cooldown: 0,
	execute(message, args) {
		// defining
        const prefix = message.client.config.prefix;
		const regex = new RegExp(`^${prefix}.*`);

        // executing
        message.channel.messages.fetch({limit: 30}).then(messages => {

            const prev_command = messages.filter(m => m.author.username === message.author.username && regex.test(m.content) && m.content !== `${prefix}up`).first();

            if (prev_command === undefined) return message.channel.send("Couldn't find previous command");
            message.client.emit("message", prev_command);
        }).catch(console.error);
    }
};
