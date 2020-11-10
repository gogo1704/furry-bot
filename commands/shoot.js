module.exports = {
    name: "shoot",
    description: "Shoot a targeted user.",
    args: true,
    usage: "<user>",
    execute(message, args) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
                if (member) {
                        message.channel.send(`You've shot ${user}!`);
                }
        } else {
          message.channel.send("Who do you want to kill?");
        }
    }
};