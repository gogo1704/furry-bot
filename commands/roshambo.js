module.exports = {
    name: "roshambo",
    description: "Rock Paper Scissors!",
    usage: "rock | paper | scissors",
    args: true,
    allowPM: true,
    cooldown: 3,
	execute(message, args) {
        const choices = ["rock", "paper", "scissors"];
        const choice = args[0].toString().toLowerCase();
        const bot_choice = choices[Math.floor(Math.random() * 3)];

        if (choice === bot_choice) return message.channel.send("It's a draw!");
        const reply = `You chose ${choice}, I choose ${bot_choice}.`;

        switch (choice) {
            case "rock":
                if (bot_choice === "paper") return message.channel.send(`${reply} You lose!`);
                if (bot_choice === "scissors") return message.channel.send(`${reply} You win!`);
                break;
            case "paper":
                if (bot_choice === "rock") return message.channel.send(`${reply} You win!`);
                if (bot_choice === "scissors") return message.channel.send(`${reply} You lose!`);
                break;
            case "scissors":
                if (bot_choice === "rock") return message.channel.send(`${reply} You lose!`);
                if (bot_choice === "paper") return message.channel.send(`${reply} You win!`);
                break;
            default:
                message.channel.send(`Usage: \`${message.client.config.prefix}${this.name} ${this.usage}\``);
                break;
        }
	}
};
