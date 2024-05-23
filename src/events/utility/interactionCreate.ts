import { Events, Interaction } from'discord.js'
import { EventHandler } from '../../@types/discord'

const interactionCreate: EventHandler = {
	name: Events.InteractionCreate,
	async execute(interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return

		const command = interaction.client.commands.get(interaction.commandName)

		if (!command) {
			interaction.reply(`No command matching ${interaction.commandName} was found.`)
            console.log(`No command matching ${interaction.commandName} was found.`)
			return
		}

		try {
			await command.execute(interaction)
		} catch (error) {
			console.error(error)
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
			}
		}
	}
}

export default interactionCreate