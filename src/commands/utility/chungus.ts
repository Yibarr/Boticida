import { SlashCommandBuilder, CommandInteraction } from 'discord.js'
import { CommandHandler } from '../../@types/discord'

const big: CommandHandler = {
	data: new SlashCommandBuilder()
		.setName('big')
		.setDescription('Big chungus'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply(':big-chungs:')
	}
}

export default big