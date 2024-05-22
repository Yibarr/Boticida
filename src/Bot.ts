import { 
    Client,
    Events,
    GatewayIntentBits,
    Collection
} from 'discord.js'
import { processModules } from './utils'
import { Command } from 'discord'
import { Settings } from 'bot'
import commands from './commands'

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
        this.initialize()
        this.setCommands()
        this.client.on(Events.InteractionCreate, interaction => {
            console.log(interaction)
        })
        
    }

    private initialize = () => {
        this.client.login(this.settings.token)
        this.client.once(Events.ClientReady, readyClient => {
            console.log(`${readyClient?.user.tag} is awake!`)
        })
    }

    private setCommands = () => {
        this.client.commands = new Collection()
        processModules(commands, (command: Command) => {
            if ('data' in command && 'execute' in command) {
                this.client.commands.set(command.data.name, command)
            } else {
                console.log(`[WARNING] The command at is missing a required "data" or "execute" property.`)
            }
        })
    }
 }

export default Bot