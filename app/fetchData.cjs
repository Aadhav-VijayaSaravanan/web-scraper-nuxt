// .cjs used due ES mosule not supporting require.

const cheerio = require("cheerio");
const axios = require("axios");

const url="https://fbref.com/en/squads/361ca564/2024-2025/matchlogs/c9/schedule/Tottenham-Hotspur-Scores-and-Fixtures-Premier-League";

async function score () {
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        
        function getMatchData() {
            const rows = $("#matchlogs_for > tbody > tr").length;
            const matchDataArray = [];
            for (let i = 2; i <= rows; i++) {
                let teamName = $(`#matchlogs_for > tbody > tr:nth-child(${i}) > td:nth-child(9)`).text() || "N/A";
                let xg = parseFloat($(`#matchlogs_for > tbody > tr:nth-child(${i}) > td:nth-child(10)`).text()) || "N/A";
                let xga = parseFloat($(`#matchlogs_for > tbody > tr:nth-child(${i}) > td:nth-child(11)`).text()) || "N/A";
                let gs = parseInt($(`#matchlogs_for > tbody > tr:nth-child(${i}) > td:nth-child(7)`).text()) || "N/A";
                let gc = parseInt($(`#matchlogs_for > tbody > tr:nth-child(${i}) > td:nth-child(8)`).text()) || "N/A";
                let ps = parseFloat($(`#matchlogs_for > tbody > tr:nth-child(${i}) > td:nth-child(12)`).text()) || "N/A";
                matchDataArray.push({ teamName, xg, xga, gs, gc, ps });
            }
            console.log(matchDataArray);
            
            /*if (matchDataArray.length >= 6) {
                console.log(`Gameweek 6: ${matchDataArray[5].teamName}`);
                console.log(`Xg: ${matchDataArray[5].xg}`);
                console.log(`Xga: ${matchDataArray[5].xga}`);
                console.log(`Goals Scored: ${matchDataArray[5].gs}`);
                console.log(`Goals Conceded: ${matchDataArray[5].gc}`);
                console.log(`Possession: ${matchDataArray[5].ps}%`);
            }
            */
            //Accessing data from a specific team
            matchDataArray.forEach((game, index) => {
                if (game.teamName.includes("West Ham")) {
                    console.log(`Gameweek ${index + 1}:`, game);
                }
            });
        }

        getMatchData();
    }
    catch(error) { // simple catch for an error - will be improved
        console.error(error);
    }
}

score();