import { Client, Events } from 'discord.js'

class App {
    private client: Client
    private token: string

    constructor(token: string) {
        this.client = new Client({
            intents: [],
            partials: [],
          })
        this.token = token
        
    }

    start() {
        this.client.login(this.token)
        this.client.once(Events.ClientReady, readyClient => {
            console.log(`${readyClient?.user.tag} is awake!`);
        });
        
    }
 }

export default App;
