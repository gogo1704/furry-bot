module.exports = {
	name: "piglatin",
	description: "Translates a sentence to Pig Latin.",
    allowPM: true,
	usage: "<text>",
	execute(message, args) {

        let answer = "";
        const is_vowel = chr => (/[aeiouąęy]/i).test(chr);

        // This is required because fetch() gives promise and we can't really set variable in promise's callback to use later unless it is all a promise
        async function print() {         

            if (args.toString().startsWith('<@!')) args = await message.client.users.fetch(args.toString().replace(/\W*/gm, '')).then(u => u.username.toString().split(' '));
            if (args.toString().includes('\n')) args = args.toString().replace(/\n/gi, ',\n,').split(',');
            
            for (let i=0; i < args.length; i++) {
                if (is_vowel(args[i].substring(0,1))){
                    answer += args[i] + "way ";

                } else if (args[i].includes('\n')) {
                    answer += args[i];

                } else {
                    answer += args[i].substring(1) + args[i].substring(0,1) + "ay ";
                }
            }

            message.channel.send(answer);

        }

        print();
        
    }
};
