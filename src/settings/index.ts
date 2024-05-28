import dotenv from 'dotenv'
import { Settings, Modes } from '../@types/bot'


dotenv.config()

const settings: Settings = {
    token: process.env.DISCORD_TOKEN || '',
    clientID: process.env.CLIENT_ID || '',
    guildID: process.env.GUILD_ID || '',
    spotifyClientID: process.env.SPOTIFY_CLIENT_ID || '',
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    youtubeApiKey: process.env.YOUTUBE_API_KEY || ''
}

export const modesList: Modes = {
    cumbia: {
        name: 'Cumbia',
        url: 'https://open.spotify.com/playlist/37i9dQZF1DXbITWG1ZJKYt?si=2f3b0c5f5e7d4a5e'
    },
    corridos: {
        name: 'Corridos',
        url: 'https://open.spotify.com/playlist/7x1KvNwHyf0Vt7abyqBYlB?si=b91c7f88f9e24a38'
    },
    valentin : {
        name: 'Valentin IA',
        url: 'https://open.spotify.com/playlist/37i9dQZF1DX4JAvHpjipBk?si=7f1c3d1b2b2e4f5b'
    }
}

export default settings
