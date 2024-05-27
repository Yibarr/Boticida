import { SlashCommandBuilder, CommandInteraction } from 'discord.js'
import { CommandHandler } from '../../@types/discord'

const server: CommandHandler = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction: CommandInteraction) {
        // @ts-ignore: Object is possibly 'null'.
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`)
	}
}

export default server