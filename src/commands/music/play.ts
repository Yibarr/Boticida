import { SlashCommandBuilder, CommandInteraction } from 'discord.js'
import { CommandHandler } from '../../@types/discord'

const play: CommandHandler = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play song'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply(':play:')
	}
}

export default play