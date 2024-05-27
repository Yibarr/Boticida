import { Player } from "discord-player"
import { SpotifyExtractor } from "@discord-player/extractor"
import { Client } from "discord.js"
import { Settings } from "../@types/bot"

export const createPlayer = async (client: Client, settings: Settings) => {
    try {
        const player: Player = new Player(client)
        await player.extractors.register(SpotifyExtractor, {
            clientId: settings.spotifyClientID,
            clientSecret: settings.spotifyClientSecret,
        })
        return player
    } catch (error) {
        console.log('Create player function error:', error)   
    }
}