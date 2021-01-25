const util = require('minecraft-server-util');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefs = require('./config.json')
client.login(prefs["bot-token"]);

const server = {
    ip: prefs["server-url"],
    port: prefs["server-port"]
};

//setup command syntax

const commands = {
    status: {
        command: 'z!status'

    },
    ip: {
        command: 'z!ip',
        text: {
            main: 'The server address is `{ip}:{port}`'
        }
    }
};


const cacheTime = 5 * 1000; // 5 second data cache time
let data, lastUpdated = 0;

// set bot status

client.on('ready', () => {
    console.log('ready!')
    updateStatus();
    setInterval(() => {
        updateStatus()
    }, 3000);

})

function updateStatus() {
    util.status(server.ip, {
            port: server.port
        })
        .then(res => {
            data = res;
            setPresence(data);
        })
        .catch(err => {
            console.error(err);
            client.user.setPresence({
                activity: {
                    name: "offline"
                },
                status: 'dnd'
            })
        })
}

function setPresence(data) {
    if (data.onlinePlayers != 0) {
        let str = `${data.onlinePlayers} / ${data.maxPlayers}`
        client.user.setPresence({
            activity: {
                name: str
            },
            status: 'online'
        })
    } else {
        let str = `${data.onlinePlayers} / ${data.maxPlayers}`
        client.user.setPresence({
            activity: {
                name: str
            },
            status: 'idle'
        })
    }
}

client.on('message', message => { // Listen for messages with trigger commands
    if (message.content.trim() == commands.status.command) {
        statusCommand(message)
    } else if (message.content.trim() == commands.ip.command) {
        ipCommand(message)
    }
});

function statusCommand(message) { // Handle status command
    util.status(server.ip, {
            port: server.port
        })
        .then(res => {
            data = res;
            lastUpdated = Date.now();
            let desString = `${res.onlinePlayers} / ${res.maxPlayers} online`
            const embed = new Discord.MessageEmbed()
                .setTitle('ONLINE')
                .setColor('00ff00')
                .setDescription(desString + '\n' + res.version)
                .setFooter(res.description)
            message.reply(embed);
        })
        .catch(err => {
            const embed = new Discord.MessageEmbed()
                .setTitle('OFFLINE')
                .setColor('ff0000')
            message.reply(embed);
            client.user.setPresence({
                activity: {
                    name: "offline"
                },
                status: 'dnd'
            })
        });
}

function ipCommand(message) { // Handle IP command
    message.reply(commands.ip.text.main.replace('{ip}', server.ip).replace('{port}', server.port));
}