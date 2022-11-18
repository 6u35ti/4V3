const Discord = require("discord.js")
const intents = new Discord.Intents(32767)
const { Token } = require('./config.json');
const client = new Discord.Client({
    intents,
    partials: ["CHANNEL", "GUILD_MEMBER", "REACTION", "MESSAGE", "GUILD_SCHEDULED_EVENT", "USER"],
    allowedMentions: { parse: ["users", "everyone", "roles"] },
})
require("dotenv").config()

const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")

const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('6u35ti x sh3ee'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);
const path = require('path')
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/index', express.static(path.join(__dirname, './public/index.html')));


// music only ↓
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client, {
    youtubeDL: false,
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: false,
        api: {
            clientId: "731ac5bf0603411f80ac446f5c02e290",
            clientSecret: "cd16a34c385b4fa5915abd596fd4e480",
        },
    })]
});
// music only ↑


module.exports = client;
client.commands = new Discord.Collection();

require("../Systems/GiveawaySystem")(client);

[ "Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
})
require("../Structures/Handlers/Events_N")(client);

client.login(Token || process.env.TOKEN);








