import { GuildQueueEvents,GuildQueue } from 'discord-player'
import { PlayerEventHandler, QueueMetadata } from 'discord'

const playerFinish: PlayerEventHandler = {
    name: 'playerFinish' as keyof GuildQueueEvents,
    execute: async (queue:  GuildQueue<QueueMetadata>) => {
        if (queue.size === 0) {
            queue.metadata.channel.send('Queue ended. There are no more songs to play.')
        }
    }
}

export default playerFinish