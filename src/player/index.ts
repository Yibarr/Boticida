import { Player } from "discord-player"
import { YouTubeExtractor } from "@discord-player/extractor"
import { Client } from "discord.js"
import { Settings } from "../@types/bot"
import CustomExtractor from "./extractors/customExtractor"

export const createPlayer = async (client: Client, settings: Settings) => {
    try {
        const player: Player = new Player(client)
        await player.extractors.register(YouTubeExtractor, {})
        await player.extractors.register(CustomExtractor, {
            clientId: settings.spotifyClientID,
            clientSecret: settings.spotifyClientSecret,
            apiKey: settings.youtubeApiKey
        })
        return player
    } catch (error) {
        console.log('Create player function error:', error)   
    }
}