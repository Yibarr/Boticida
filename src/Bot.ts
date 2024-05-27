import { 
    Client,
    GatewayIntentBits,
    Collection,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle
} from 'discord.js'
import { processModules } from './utils'
import { CommandHandler, EventHandler } from 'discord'
import { Settings } from 'bot'
import { createPlayer } from './player'
import commands from './commands'
import events from './events'

class Bot {
    private client: Client
    private settings: Settings

    constructor(settings: Settings) {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildVoiceStates
            ]
        })
        this.settings = settings
    }

    async start() {
        try {
            await this.setEvents()
            await this.setCommands()
            await this.initialize()
            const player = await createPlayer(this.client, this.settings)
            await player?.extractors.loadDefault(((ext) => ext !== 'YouTubeExtractor'))
            player?.events.on('playerStart', async (queue, track) => {
                const embed = new EmbedBuilder()
                    .setTitle(`Now playing: `)
                    .setDescription(
                        `
                        **[${track.title}](${track.url})** by ${track.author}
                        Duration: ${track.duration}
                        Queue: ${queue.size}
                        `)
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
                    const row = new ActionRowBuilder()
                    .addComponents(
                        pauseButton,
                        skipButton
                    )

                const response = await queue.metadata.channel.send(
                    {
                        embeds: [embed],
                        components: [row]
                    }
                )

                const filter = (i: any) => ['play', 'pause', 'skip', 'return'].includes(i.customId)
                try {
                    const collector = await response.createMessageComponentCollector({ filter })
                    collector.on('collect', async (i:any) => {
                
                        if (i.customId === 'play') {
                            queue.node.setPaused(false)
                            await i.update({ components: [row.setComponents(
                                pauseButton,
                                skipButton
                            )]})
                        } else if (i.customId === 'pause') {
                            queue.node.setPaused(true)
                            await i.update({ components: [row.setComponents(
                                playButton,
                                skipButton
                            )] })
                        } else if (i.customId === 'skip') {
                            queue.node.skip()
                            await i.update({ content: `Skipped track: **${track.description}**`, components: [] })
                            collector.stop()
                        }
                    })
    
                    collector.on('end', async (collected: any) => {
                        await response.edit({
                            components: [row.setComponents(
                                playButton.setDisabled(true),
                                skipButton.setDisabled(true)
                            )]
                        })
                    })
                    
                } catch (e) {
                    console.log(e)
                }
            })
            player?.events.on('playerFinish', (queue) => {
                if (queue.size === 0) {
                    queue.metadata.channel.send('Queue ended. There are no more songs to play.')
                }
            })
            player?.events.on('playerError', (queue, error) => {
                queue.metadata.channel.send(`${error.name} Could not extract stream for this track`)
                
            }) 
        } catch (error) {
            console.log('start', error)
        }
    }

    private initialize = () => {
        this.client.login(this.settings.token)        
    }

    private setEvents = () => {
        processModules(events, (event: EventHandler) => {
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args))
            } else {
                this.client.on(event.name, (...args) => event.execute(...args))
            }
        })
    }

    private setCommands = () => {
        this.client.commands = new Collection()
        processModules(commands, (command: CommandHandler) => {
            if ('data' in command && 'execute' in command) {
                this.client.commands.set(command.data.name, command)
            } else {
                console.log(`[WARNING] The command at is missing a required "data" or "execute" property.`)
            }
        })
    }
 }

export default Bot