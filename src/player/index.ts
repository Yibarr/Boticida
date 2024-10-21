import { Player } from "discord-player"
import { Client } from "discord.js"
import { Settings } from "../@types/bot"
import { YoutubeiExtractor, generateOauthTokens } from "discord-player-youtubei"

export const createPlayer = async (client: Client, settings: Settings) => {
    try {
        const player: Player = new Player(client)
        // let authTokens: String = await generateOauthTokens()
        player.extractors.register(YoutubeiExtractor, {
            authentication: ""
        })

        return player
    } catch (error) {
        console.log('Create player function error:', error)   
    }
}