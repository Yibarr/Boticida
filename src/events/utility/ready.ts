import { Events, Client } from 'discord.js'
import { EventHandler } from '../../@types/discord'

const ready: EventHandler = {
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        if (client.user) {
            console.log(`${client?.user.tag} is awake!`)
        } else {
            console.log('Client is ready but user is null')
        }
    }
}

export default ready