import dotenv from 'dotenv'
import { Settings } from '../@types/bot'


dotenv.config()

const settings: Settings = {
    token: process.env.DISCORD_TOKEN || '',
    clientID: process.env.CLIENT_ID || '',
    guildID: process.env.GUILD_ID || '',
    spotifyClientID: process.env.SPOTIFY_CLIENT_ID || '',
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    youtubeApiKey: process.env.YOUTUBE_API_KEY || ''
}

export default settings
