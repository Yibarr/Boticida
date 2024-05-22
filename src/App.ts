import { 
    Client,
    Events,
    GatewayIntentBits,
    Collection,  
    Interaction, 
    CacheType 
} from 'discord.js'
import Commands from '../src/commands'

class App {
    private client: Client
    private token: string

    constructor(token: string) {
        this.client = new Client({
            intents: [GatewayIntentBits.Guilds]
          })
        this.token = token
        this.client.commands = new Collection()
        
    }

    start() {
        this.client.login(this.token)
        this.client.once(Events.ClientReady, readyClient => {
            console.log(`${readyClient?.user.tag} is awake!`)
        })
        
        this.setCommands()
        this.client.on(Events.InteractionCreate, (interaction:  Interaction<CacheType>) => {
        })
        
    }

    private setCommands = async () => {
         Object
            .values(Commands)
            .map(commandModule => commandModule.default)
            .forEach(command => {
                if ('data' in command && 'execute' in command) {
                    this.client.commands.set(command.data.name, command);
                } else {
                    console.log(`[WARNING] The command at is missing a required "data" or "execute" property.`);
                }
            })
    }
 }

export default App;




    
