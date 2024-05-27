import dotenv from 'dotenv'
dotenv.config()

const settings = {
    token: process.env.DISCORD_TOKEN || '',
    clientID: process.env.CLIENT_ID || '',
    guildID: process.env.GUILD_ID || '',
    spotifyClientID: process.env.SPOTIFY_CLIENT_ID || '',
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || ''
}

export default settings