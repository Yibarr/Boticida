
export type BotModules<T> = {
    default: T
}

export type Settings = {
    token: string,
    clientID: string,
    guildID: string,
    spotifyClientID: string,
    spotifyClientSecret: string,
    youtubeApiKey: string
}