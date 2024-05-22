import { Client, Events, GatewayIntentBits, Collection,  Interaction, CacheType } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import { Command } from './@types/discord'

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
            console.log(interaction)
        })
        
    }

    private setCommands = async () => {

         

        const foldersPath = path.join(__dirname, '..', 'src', 'commands');
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                // does not work on this require
                console.log(filePath)
                const command: Command = await import ('./commands/utility/chungus') as Command
        //         // Set a new item in the Collection with the key as the command name and the value as the exported module
                if ('data' in command && 'execute' in command) {
                    this.client.commands.set(command.data.name, command);
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
    }
 }

export default App;




    
