module.exports = {
    name: "spam",
    description: "Spams custom message to another user.",
    usage: '<message> <@user> <number>',
    cooldown: 600,
	execute(message, args) {
        // defining
        const spam_msg = args.slice(0, args.length-2).join(" ");
        const spam_usr = message.mentions.users.first();
        const spam_num = parseInt(args[args.length-1]);

        // checking
        if (spam_msg == undefined) return message.channel.send("Something's wrong with your message");
        if (spam_usr == undefined) return message.channel.send("Can't find user");
        if (isNaN(spam_num)) return message.channel.send("Number must be a number");
        if (spam_num<=0) return message.channel.send("Number must be higher than 0");

        // executing
        message.channel.send("Here we go!");
        for (let i=0; i<spam_num; i++) {
            spam_usr.send(spam_msg);
        }
    }
};
