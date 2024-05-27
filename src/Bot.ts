import { 
    Client,
    GatewayIntentBits,
    Collection
} from 'discord.js'
import { processModules } from './utils'
import { CommandHandler, EventHandler, PlayerEventHandler } from 'discord'
import { Settings } from 'bot'
import { createPlayer } from './player'
import commands from './commands'
import events from './events/utility'
import playerEvents from './events/player'
import { GuildQueueEvents } from 'discord-player'

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
            await this.setPlayerEvents()
            await this.initialize()
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

    private setPlayerEvents = async () => {
        const player = await createPlayer(this.client, this.settings);
        await player?.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

        processModules(playerEvents, (event: PlayerEventHandler) => {
            player?.events.on(event.name as keyof GuildQueueEvents, (queue: any, ...args: any[]) => event.execute(queue, ...args))
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