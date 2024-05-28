import { Events } from 'discord.js'
import { EventHandler } from '../../@types/discord'

const error: EventHandler = {
    name: Events.Error,
    async execute(error) {
        console.log(error.resource.metadata.title, 'Error:', error.message)
    }
}

export default error