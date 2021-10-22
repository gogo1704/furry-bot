module.exports = {
	name: "reverse",
	description: "Reverse a sentence.",
	allowPM: true,
	args: true,
	usage: "<text>",
	execute(message, args) {
		let joinedArgs = args.join(" ");
		console.log(joinedArgs);
		let mentionRegex = /<@!?(\d+)>/g;
		let mentionIterator = joinedArgs.matchAll(mentionRegex);
		for (match of mentionIterator) {
			joinedArgs = joinedArgs.replace(match[0], message.client.users.cache.get(match[1]).username);
		}
		let emojiRegex = /<:(\D+):(\d+)>/g;
		let emojiIterator = joinedArgs.matchAll(emojiRegex);
		for (match of emojiIterator) {
			joinedArgs = joinedArgs.replace(match[0], match[0].split("").reverse().join(""));
		}
		let emojiUnicodeRegex = /\p{Emoji_Presentation}/gu;
		let emojiUnicodeIterator = joinedArgs.matchAll(emojiUnicodeRegex);
		for (match of emojiUnicodeIterator) {
			joinedArgs = joinedArgs.replace(match[0], match[0].split("").reverse().join(""));
		}

        const answer = joinedArgs.split("").reverse().join("");
        message.channel.send(answer);

    }
};
