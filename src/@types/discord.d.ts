import {
  Collection,
  SlashCommandBuilder,
  CommandInteraction,
  ClientEvents
} from "discord.js";

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