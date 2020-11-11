const { prefix } = require("../local/config.json");
module.exports = {
	name: "up",
	description: "Execute command above once again.",
	execute(message, args) {
		let filtered;
		message.channel.messages.fetch({ limit: 40 }) 
  			.then(messages => filtered = messages.filter(m => m.author.username === message.author.username && /^;.*/.test(m.content) && m.content !== `${prefix}up`).first())
  			.catch(console.error);
  		if (typeof filtered !== "undefined") {
  			message.client.emit("message", filtered);
  		}
	}
};
// message.client.emit("message", .first())
// messages.filter(m => m.author.username === message.author.username && /^;.*/.test(m.content) && m.content !== `${prefix}up`)