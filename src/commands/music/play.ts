
import { SlashCommandBuilder, CommandInteraction, GuildMember, EmbedBuilder } from 'discord.js'
import { CommandHandler } from '../../@types/discord'
import { useMainPlayer } from 'discord-player'
import { modesList } from '../../settings'

const play: CommandHandler = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The song you want to play')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Mode activated!')
                .setRequired(false)
                .addChoices(Object.keys(modesList).map(mode => ({
                    name: modesList[mode].name,
                    value: mode
                })))
        ) as SlashCommandBuilder,
    async execute(interaction: CommandInteraction) {
        try {
            const player = useMainPlayer()
            const channel = (interaction.member as GuildMember)?.voice.channel
            if (!channel) return interaction.reply('You are not connected to a voice channel.')

            const query = interaction.options.get('query')?.value as string
            const mode = interaction.options.get('mode')?.value as string
            const url = mode ? modesList[mode]?.url : query
            const title = mode ? modesList[mode]?.name : 'Song added to the queue'
        
            await interaction.deferReply()
            const { track } = await player.play(channel, url, {
                nodeOptions: {
                    metadata: interaction 
                }
            })
            const embed = new EmbedBuilder()
                    .setTitle(`${title}`)
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