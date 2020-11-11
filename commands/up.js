const { prefix } = require("../local/config.json");

module.exports = {
	name: "up",
	description: "Execute command above once again.",
	args: false,
	
	execute(message, args) {
		let filtered;
		message.channel.messages.fetch({ limit: 40 })				// Get 40 last  messages
		
			.then(messages => filtered = messages
			.filter(m => m.author.username === message.author.username &&	// Filter messages for username
			/^;.*/.test(m.content) && 					// Filter for commands starting with ;
			m.content !== `${prefix}up`).first())				// Filter out ;up command
					
			.catch(console.error);						// Catch promise errors (doesn't really works)
		
		//
		if (typeof filtered !== "undefined") {					
  			message.client.emit("message", filtered);		
  		}
	}
};
