import { 
    Client,
    GatewayIntentBits,
    Collection
} from 'discord.js'
import { processModules } from './utils'
import { CommandHandler, EventHandler } from 'discord'
import { Settings } from 'bot'
import commands from './commands'
import events from './events'

class Bot {
    private client: Client
    private settings: Settings

    constructor(settings: Settings) {
        this.client = new Client({
            intents: [GatewayIntentBits.Guilds]
          })
        this.settings = settings
    }

    start() {
        this.setEvents()
        this.setCommands()
        this.initialize()
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