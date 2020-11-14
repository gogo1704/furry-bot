const Discord = require("discord.js");
module.exports = {
	name: "embed",
	description: "Sends an embed. (used for debbuging)",
    allowPM: true,
	execute(message, args) {
		const embed = new Discord.MessageEmbed()
			//.setColor('#FFFF00')
			.setTitle('Test title')
			//.setURL('https://discord.js.org/')
			//.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
			.setDescription('Some description here')
			//.setThumbnail('https://i.imgur.com/wSTFkRM.png')
			.addField("Sex","Zgadza się") 
			.addField('Inline field title', 'Some value here', true)
			.addField('Inline field title', 'Some value here', true)
			.addField("Sex","Zgadza się") 
			//.setImage('https://i.imgur.com/wSTFkRM.png')
			//.setTimestamp()
			.setFooter('Some footer text here');

			message.channel.send(embed);
	}
};
