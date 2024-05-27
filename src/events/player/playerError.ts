import { GuildQueueEvents,GuildQueue } from 'discord-player'
import { PlayerEventHandler, QueueMetadata } from 'discord'

const playerError: PlayerEventHandler = {
    name: 'playerError' as keyof GuildQueueEvents,
    execute: async (queue:  GuildQueue<QueueMetadata>, error: Error) => {
        queue.metadata.channel.send(`${error.name} Could not extract stream for this track`)
    }
}

export default playerError