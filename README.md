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
    - Get the token and client id from [Discord developer portal](https://discord.com/developers/applications)
    - Get the server id [Enabling develper mode](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID)
    - Get the client id and client secre from spotify as instructed in [Spotify for developers](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)
    - Get YouTube API Key as told in [YouTube API Docs](https://developers.google.com/youtube/v3/getting-started?hl=es-419)
```
DISCORD_TOKEN=<Your-token-here>
CLIENT_ID=<Your-client-id-here>
GUILD_ID=<Your-guild-id-here>
SPOTIFY_CLIENT_ID=<Your-spotify-client-id-here>
SPOTIFY_CLIENT_SECRET=<Your-spotify-secret-here>
YOUTUBE_API_KEY=<Your-youtube-api-key>
```

4. Initialize discord bot

```shell
npm start
```

### Development

To avoid manual restarting discord bot process

In another window fo your terminal run the command `dev`
```shell
npm run dev
```

For deploying new commands or updating description, names, etc
```shell
npm run deploy:commands
```

### Instructions

You can play a song using the `/play` command and skip the song using the `/skip` command once you deployed the commands.