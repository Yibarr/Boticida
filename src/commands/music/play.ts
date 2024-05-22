import { SlashCommandBuilder, CommandInteraction } from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play song'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply(':play:')
	}
}