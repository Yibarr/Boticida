import { SlashCommandBuilder, CommandInteraction, GuildMember, EmbedBuilder } from 'discord.js'
import { CommandHandler } from '../../@types/discord'
import { useMainPlayer } from 'discord-player'

const play: CommandHandler = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The song you want to play')
                .setRequired(true)
        ) as SlashCommandBuilder,
    async execute(interaction: CommandInteraction) {
        try {
            const player = useMainPlayer()
            const channel = (interaction.member as GuildMember)?.voice.channel
            if (!channel) return interaction.reply('You are not connected to a voice channel.')

            const query = interaction.options.get('query', true)?.value as string
        
            await interaction.deferReply()
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: interaction 
                }
            })
            const embed = new EmbedBuilder()
                    .setTitle(`Song added to the queue`)
                    .setDescription(
                        `
                        **[${track.description}](${track.url})**
                        `)
                    .setThumbnail(track.thumbnail)

            return interaction.followUp({
                embeds: [embed]
            })
        } catch (e) {
            console.log(`Something went wrong: ${e}`)
            const command = interaction.client.commands.get(interaction.commandName)
            if(!command) {
                return interaction.followUp('Something went wrong, please try again later.')
            } else {
                console.log(`Something went wrong: ${e}`)
                return interaction.followUp(`Something went wrong with ${command.name}, please try again later.`)
            }
        }
    }
}

export default play
