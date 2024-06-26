import { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle } from 'discord.js'
import { GuildQueue, Track, GuildQueueEvents } from 'discord-player'
import { PlayerEventHandler, QueueMetadata } from 'discord'
const playerStart: PlayerEventHandler = {
    name: 'playerStart' as keyof GuildQueueEvents,
    execute: async (queue: GuildQueue<QueueMetadata>, track: Track) => {
        const embed = new EmbedBuilder()
            .setTitle('Now playing:')
            .setDescription(
                `
                **[${track.description}](${track.url})**
                Duration: ${track.duration}
                Queue: ${queue.size}
                `
            )
            .setThumbnail(track.thumbnail)

        const playButton = new ButtonBuilder()
            .setCustomId('play')
            .setLabel('Play')
            .setStyle(ButtonStyle.Primary)

        const skipButton = new ButtonBuilder()
            .setCustomId('skip')
            .setLabel('Skip')
            .setStyle(ButtonStyle.Secondary)

        const pauseButton = new ButtonBuilder()
            .setCustomId('pause')
            .setLabel('Pause')
            .setStyle(ButtonStyle.Primary)

        const stopButton = new ButtonBuilder()
            .setCustomId('stop')
            .setLabel('Stop')
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(pauseButton, skipButton, stopButton)

        try {
            const response = await queue.metadata.channel.send({
                embeds: [embed],
                components: [row]
            })

            const filter = (i: any) => ['play', 'pause', 'skip', 'stop'].includes(i.customId)

            const collector = response.createMessageComponentCollector({ filter })

            collector.on('collect', async (i: any) => {
                if (i.customId === 'play') {
                    queue.node.setPaused(false)
                    await i.update({
                        components: [new ActionRowBuilder<ButtonBuilder>().addComponents(pauseButton, skipButton, stopButton)]
                    })
                } else if (i.customId === 'pause') {
                    queue.node.setPaused(true)
                    await i.update({
                        components: [new ActionRowBuilder<ButtonBuilder>().addComponents(playButton, skipButton, stopButton)]
                    })
                } else if (i.customId === 'skip') {
                    queue.node.skip()
                    await i.update({ content: `Skipped track: **${track.title}**`, components: [] })
                    collector.stop()
                } else if(i.customId === 'stop') {
                    queue.node.stop()
                    await i.update({ content: 'Stopped the player', components: [] })
                    collector.stop()
                }
            })

            collector.on('end', async (_: any) => {
                await response.edit({
                    components: [new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(playButton.setDisabled(true), skipButton.setDisabled(true))]
                })
            })

        } catch (e) {
            queue.metadata.channel.send(`Something went wrong playing: ${track.description}`)
            console.log(`Something went wrong playing ${track.description}: ${e}`)
        }
    }
}

export default playerStart
