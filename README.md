# Boticida

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

Boticida is an open source discord bot made with typescript that's in early development. Built on top of [discord.js](https://discord.js.org/) and [discord-player.js](https://discord-player.js.org/) for our bot's main features.

### Installation

1. Fetch dependencies with `npm`
```shell
npm install
```
2. You'll need to create a token and add it to a server as described in [Discord Developer Portal Docs](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app) 

3. Create a file at the project root with the name `.env` this will contain your discord app token as follows:
```
DISCORD_TOKEN=<Your-Token-Here>
```

4. Build webpack bundle

```shell
npm run build
```

5. Initialize discord bot

```shell
npm start
```

### Development

To avoid manual restarting of the build and discord bot process, yu can use the following commands, make sure to run each of them in two different terminal processes.
First run the command `watch:build` to restart the build each time you made a change inside the `/src` directory
```
npm run watch:build
```

In another window fo your terminal run the command `dev`
```
npm run dev
```

Now you can start developing reducing manual restarts of the project

