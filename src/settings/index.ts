import dotenv from 'dotenv'
dotenv.config()

const settings = {
    token: process.env.DISCORD_TOKEN || '',
    clientID: process.env.CLIENT_ID || '',
    guildID: process.env.GUILD_ID || ''
}

export default settings