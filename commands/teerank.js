//import cheerio from "cheerio";

module.exports = {
	name: "teerank",
	description: "Check someones rank on https://ddnet.tw/",
	allowPM: true,
	args: true,
	usage: "<player name>",
	execute(message, args) {
		const playerBaseUrl = "https://ddnet.tw/players/";
		// work in progress.
		/*
		let playerName = args[0].split(" ").join("-32-");
    	let response = fetchData(this.playerBaseUrl + playerName);
    	console.log(response)
    	*/
	}
}; 	

/*
async function fetchData(url) {
	let response = await fetch(url);
	if (response.ok) {
		let text = await response.text();
	} else {
		console.log("sex");
	}
	return text;
}
*/

/*
  async getLatestFavouriteHtml(playerName: string) {
    let data = await this.getPlayerPage(playerName);
    let $ = cheerio.load(data)

    let x = [...$("article > section > div#global").children()].filter(
      (x) => x.attribs.class == "block6 ladder"
    );

    return cheerio.load(x);
  }

  async getLatestFinishes(playerName: string): Promise<LatestFinishes[]> {
    let data = await this.getLatestFavouriteHtml(playerName);

    let divs = [...data("div")];

    let table = [...cheerio.load(divs[0])("table > tbody").children()];
    let scraped: LatestFinishes[] = [];

    table.forEach((child) => {
      let x = cheerio.load(child);

      let finishInfoString = [...x("td").children()]
        .map((inner) => {
          if (inner.firstChild)
            return (
              (inner.firstChild as any)?.data + " " + (inner.next as any)?.data
            );
        })
        .join(" ");

      let finishInfo = finishInfoString
        .trim()
        .split(" ")
        .filter((x) => x != ":" && x != "");

      let date = new Date(finishInfo[0] + " " + finishInfo[1]);
      let mapName = finishInfo.slice(2, finishInfo.length).join(" ");

      let finishInfoObj: LatestFinishes = {
        date: date,
        mapType: finishInfo[2],
        mapName: mapName,
      };

      scraped.push(finishInfoObj);
    });

    return scraped;
  }

  async getFavouritePartners(playerName: string): Promise<string[]> {
    let data = await this.getLatestFavouriteHtml(playerName);

    let divs = [...data("div")];

    let table = [...cheerio.load(divs[1])("table > tbody").children()];
    let scraped: string[] = [];

    table.forEach((child) => {
      let x = cheerio.load(child);
      let y = "";

      [...x("td").children()].forEach((inner) => {
        if (inner.firstChild) {
          y +=
            (inner.firstChild as any)?.data + " " + (inner.next as any)?.data;
        }
      });
      scraped.push(y);
    });

    return scraped;
  }
}
*/