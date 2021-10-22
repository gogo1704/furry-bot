module.exports = {
    name: "spam",
    description: "Sends a custom message to another user 5 times.",
    usage: '<@user> <message>',
    cooldown: 600,
	execute(message, args) {
        // defining
        const spam_msg = args.slice(1, args.length).join(" ");
        const spam_usr = message.mentions.users.first();
        // checking
        if (spam_msg === undefined || spam_usr === undefined) return message.channel.send(message.channel.send(`Usage: \`${message.client.config.prefix}${this.name} ${this.usage}\``));
        // executing
        message.channel.send("Sending...");
        for (let i=0; i<5; i++) {
            spam_usr.send(spam_msg);
        }
    }
};
