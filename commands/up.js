module.exports = {
	name: "up",
	description: "Execute command above once again.",
    allowPM: true,
	execute(message, args) {
		const prefix = message.client.config.prefix;
		const regex = new RegExp(`^${prefix}.*`);
		message.channel.messages.fetch({ limit: 30 }) 
  			.then(messages => message.client.emit("message", messages.filter(m => m.author.username === message.author.username && regex.test(m.content) && m.content !== `${prefix}up`).first()))
  			.catch(console.error);

  		
	}
};
