import {
  Collection,
  SlashCommandBuilder,
  CommandInteraction,
  ClientEvents,
  BaseGuildTextChannel
} from "discord.js"

declare module "discord.js" {
  export interface Client {
    commands: Collection<any, any>
  }
}

export interface CommandHandler {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => void
}
export interface EventHandler {
  name: keyof ClientEvents,
  once?: boolean,
  execute: (...args: any[]) => void
}

export type ExecuteArgument = Track | Error | undefined

export interface PlayerEventHandler {
  name: keyof GuildQueueEvents,
  execute: (queue: GuildQueue<QueueMetadata>, arg?: ExecuteArgument) => unknown
}

export interface QueueMetadata {
    channel: BaseGuildTextChannel
}
