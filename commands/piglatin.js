module.exports = {
	name: "piglatin",
	description: "Translates a sentence to Pig Latin.",
    allowPM: true,
	usage: "<text>",
	execute(message, args) {

        let answer = "";
        const is_vowel = chr => (/[aeiouąęy]/i).test(chr);
    
        args = args.join("");

        let mentionRegex = /<@!?(\d+)>/g;
        let mentionIterator = args.matchAll(mentionRegex);
        for (match of mentionIterator) {
            args = args.replace(match[0], ` ${message.client.users.cache.get(match[1]).username} `);
        }


        let emojiRegex = /<:(\D+):(\d+)>/g;
        let emojiIterator = args.matchAll(emojiRegex);
        for (let match of emojiIterator) {
            args = args.replace(match[0], ` ${match[0]} `);
        }
        let emojiUnicodeRegex = /\p{Emoji_Presentation}/gu;
        let emojiUnicodeIterator = args.matchAll(emojiUnicodeRegex);
        for (let match of emojiUnicodeIterator) {
            console.log(match);
            args = args.replace(match[0], ` ${match[0]} `);
        }
        args = args.trim();
        args = args.split(" ");
        args = args.filter(word => word !== "");
        if (args.toString().includes('\n')) args = args.toString().replace(/\n/gi, ',\n,').split(',');
        for (let word of args) {
            if (emojiRegex.test(word) || emojiUnicodeRegex.test(word)) {
                answer += ` ${word} `;    
            } else if (is_vowel(word[0])) {
                answer += word + "way ";
            } else if (word.includes('\n')) {
                answer += word;
            } else if (word === "") {
                answer += "";
            } else {
                answer += word.substring(1) + word[0] + "ay ";
            }
        }

        message.channel.send(answer);
    }
};
