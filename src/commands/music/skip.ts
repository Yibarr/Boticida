import { SlashCommandBuilder, CommandInteraction, GuildMember } from 'discord.js'
import { CommandHandler } from '../../@types/discord'
import { useMainPlayer } from 'discord-player'

const skip: CommandHandler = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),
    async execute(interaction: CommandInteraction) {
        if (!interaction.guildId) {
            return interaction.reply({ content: 'This command can only be used in a guild.', ephemeral: true })
        }

        const player = useMainPlayer()
        const queue = player.queues.get(interaction.guildId)

        if (!queue || !queue.node.isPlaying()) {
            return interaction.reply({ content: 'There is no song playing currently!', ephemeral: true })
        }

        const member = interaction.member as GuildMember
        if (!member.voice.channel) {
            return interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true })
        }

        const botVoiceChannel = interaction.guild?.members.me?.voice.channel
        if (!botVoiceChannel || member.voice.channel.id !== botVoiceChannel.id) {
            return interaction.reply({ content: 'You need to be in the same voice channel as the bot to use this command!', ephemeral: true })
        }

        queue.node.skip()
        return interaction.reply({ content: 'Skipped current track' })
    }
}

export default skip
