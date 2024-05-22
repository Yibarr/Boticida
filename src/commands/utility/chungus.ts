import { SlashCommandBuilder, CommandInteraction } from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('big')
		.setDescription('Big chungus'),
	async execute(interaction: CommandInteraction) {
		console.log(interaction)
		await interaction.reply(':big-chungs:')
	}
}