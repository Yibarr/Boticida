import { REST, Routes } from 'discord.js'
import { CommandHandler } from 'discord'
import { processModules } from '../utils'
import settings from '../settings'
import commands from '../commands'

const commandsTemp: any[] = []

processModules(commands, (command: CommandHandler) => {
    if ('data' in command && 'execute' in command) {
        commandsTemp.push(command.data.toJSON())
    } else {
        console.log('The command at is missing a required "data" or "execute" property.')
    }
})

const rest = new REST().setToken(settings.token)

const deploy = async () => {
    try {
        console.log(`Started refreshing ${commandsTemp.length} application (/) commands.`)

        const data = await rest.put(
            Routes.applicationGuildCommands(settings.clientID, settings.guildID),
            { body: commandsTemp },
        )

        console.log("Successfully reloaded application (/) commands.", data)
    } catch (error) {
        console.error(error)
    }
}

deploy()
