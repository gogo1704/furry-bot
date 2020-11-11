const { prefix } = require("../local/config.json");
module.exports = {
	name: "up",
	description: "Execute command above once again.",
	execute(message, args) {
		message.channel.messages.fetch({ limit: 30 }) 
  			.then(messages => message.client.emit("message", messages.filter(m => m.author.username === message.author.username && /^;.*/.test(m.content) && m.content !== `${prefix}up`).first()))
  			.catch(console.error);

  		
	}
};