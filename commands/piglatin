module.exports = {
	name: "piglatin",
	description: "Translates a sentence to Pig Latin.",
    	allowPM: true,
	usage: "<text>",
	execute(message, args) {
        let answer = "";
        const is_vowel = chr => (/[aeiouąęy]/i).test(chr);

        for(let i=0;i < args.length; i++){
            if(is_vowel(args[i].substring(0,1))){
                answer += args[i] + "way ";
            } else {
                answer += args[i].substring(1) + args[i].substring(0,1) + "ay ";
            }
        }
        message.channel.send(answer);
    }
};
