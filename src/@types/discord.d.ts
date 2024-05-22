import { Collection, SlashCommandBuilder, CommandInteraction } from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<any, any>
  }
}

export interface Command {
    data: any,
    execute: any // Define the execute function's signature
}