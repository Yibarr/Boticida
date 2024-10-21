import { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle } from 'discord.js'
import { GuildQueue, Track, GuildQueueEvents } from 'discord-player'
import { PlayerEventHandler, QueueMetadata } from 'discord'
import { timeStamp } from 'console'
const playerStart: PlayerEventHandler = {
    name: 'playerStart' as keyof GuildQueueEvents,
    execute: async (queue: GuildQueue<QueueMetadata>, track: Track) => {
        console.log(`Now playing: ${ track.description } requested by ${ track.requestedBy || "Unknown" } at ${ timeStamp() }`)
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

            const filter = (interaction: any) => ['play', 'pause', 'skip', 'stop'].includes(interaction.customId)

            const collector = response.createMessageComponentCollector({ filter })

            collector.on('collect', async (interaction: any) => {
                if (interaction.customId === 'play') {
                    queue.node.setPaused(false)
                    await interaction.update({
                        components: [new ActionRowBuilder<ButtonBuilder>().addComponents(pauseButton, skipButton, stopButton)]
                    })
                } else if (interaction.customId === 'pause') {
                    queue.node.setPaused(true)
                    await interaction.update({
                        components: [new ActionRowBuilder<ButtonBuilder>().addComponents(playButton, skipButton, stopButton)]
                    })
                } else if (interaction.customId === 'skip') {
                    queue.node.skip()
                    await interaction.update({ content: `Skipped track: **${track.title}**`, components: [] })
                    collector.stop()
                } else if(interaction.customId === 'stop') {
                    queue.node.stop()
                    await interaction.update({ content: 'Stopped the player', components: [] })
                    collector.stop()
                }
            })

            collector.on('end', async (_: any) => {
                await response.edit({
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(playButton.setDisabled(true), skipButton.setDisabled(true)),
                    ],
                });
            })

        } catch (e) {
            queue.metadata.channel.send(`Something went wrong playing: ${track.description}`)
            console.log(`Something went wrong playing ${track.description}: ${e}`)
        }
    }
}

export default playerStart
