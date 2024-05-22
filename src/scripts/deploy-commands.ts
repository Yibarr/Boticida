import { REST, Routes } from 'discord.js';
import { Command } from 'discord'
import { processModules } from '../utils'
import settings from '../settings'
import commands from '../commands'

const commandsTemp: any[] = []

processModules(commands, (command: Command) => {
    if ('data' in command && 'execute' in command) {
        commandsTemp.push(command.data.toJSON())
    } else {
        console.log(`[WARNING] The command at is missing a required "data" or "execute" property.`)
    }
})


// Construct and prepare an instance of the REST module
const rest = new REST().setToken(settings.token);

// Deploy your commands
(async () => {
    try {
        console.log(`Started refreshing ${commandsTemp.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(settings.clientID, settings.guildID),
            { body: commandsTemp },
        );

        console.log("Successfully reloaded application (/) commands.", data);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})()
