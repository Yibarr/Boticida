export type BotModule<T> = {
    default: T
}

export type Settings = {
    token: string,
    clientID: string,
    guildID: string
} 