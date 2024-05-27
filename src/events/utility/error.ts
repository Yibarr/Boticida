import { Events } from 'discord.js'
import { EventHandler } from '../../@types/discord'

const error: EventHandler = {
    name: Events.Error,
    async execute(error) {
        console.log('Error:', error.message, 'with track', error.resource.metadata.title)
    }
}

export default error