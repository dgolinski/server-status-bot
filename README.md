# Simple Minecraft Server Status Discord Bot

This is not too hard to use if you can follow directions.

1.  Clone the repo using `git clone https://github.com/dgolinski/mcsrv-status`
2.  Open the repo in a terminal (`cd mcsrv-status`)
3.  Go into the src folder (`cd src`)
4.  Create an empty file called config.json (`touch config.json`)
5.  Open `config.json` and paste the following, replacing `[server-url or ip]` and `[token]`
 ```
{
    "server-url": "[server-url or ip]",
    "server-port": 25565,
    "bot-token": "[token]"
}
```
6.  Save `config.json`
7.  run `npm i`
8.  run `node .`

No, I will not tell you how to make a discord bot, but Google happily will.

I offer pro bono help when I'm in the mood.

Yes, I know that there are tokens and other private stuffs in the commit history. No, they don't work anymore.