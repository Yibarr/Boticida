import { BaseExtractor, GuildQueue, Track, ExtractorExecutionContext } from 'discord-player'
import { Readable } from 'stream'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-node'
import ytdl from 'ytdl-core'

interface CustomTrack {
    title: string
    url: string
    duration: string
    thumbnail: string
    artist: string
}

class CustomExtractor extends BaseExtractor {
    private spotifyApi: SpotifyWebApi
    private apiKey: string

    constructor(context: ExtractorExecutionContext, options: { clientId: string, clientSecret: string, apiKey: string }) {
        super(context)

        this.spotifyApi = new SpotifyWebApi({
            clientId: options.clientId,
            clientSecret: options.clientSecret
        })
        this.apiKey = options.apiKey
        this.authenticate()
    }

    private async authenticate() {
        try {
            const data = await this.spotifyApi.clientCredentialsGrant()
            this.spotifyApi.setAccessToken(data.body['access_token'])
            setTimeout(() => this.authenticate(), data.body['expires_in'] * 1000)
        } catch (error) {
            console.error('Spotify authentication error:', error)
        }
    }

    public async resolve(query: string, queue: GuildQueue): Promise<Track[]> {
        try {
            const trackId = this.extractTrackId(query)
            if (!trackId) throw new Error('Invalid Spotify URL')
            
            const trackData = await this.getTrackData(trackId)
            const track = new Track(this.context.player, {
                title: trackData.title,
                url: trackData.url,
                duration: trackData.duration,
                thumbnail: trackData.thumbnail,
                author: trackData.artist,
                source: 'spotify'
            })

            return [track]
        } catch (error) {
            console.error('Error resolving Spotify track:', error)
            return []
        }
    }

    private extractTrackId(url: string): string | null {
        const match = url.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/)
        return match ? match[1] : null
    }

    private async getTrackData(trackId: string): Promise<CustomTrack> {
        const response = await this.spotifyApi.getTrack(trackId)
        const track = response.body
        return {
            title: track.name,
            url: `https://open.spotify.com/track/${trackId}`,
            duration: this.convertDuration(track.duration_ms),
            thumbnail: track.album.images[0]?.url || '',
            artist: track.artists.map(artist => artist.name).join(', ')
        }
    }

    private convertDuration(durationMs: number): string {
        const minutes = Math.floor(durationMs / 60000)
        const seconds = Math.floor((durationMs % 60000) / 1000)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    public async stream(track: Track): Promise<Readable> {
        const youtubeUrl = await this.searchYoutube(track.title)
        return ytdl(youtubeUrl, { filter: 'audioonly' })
    }

    private async searchYoutube(query: string): Promise<string> {
        try {
            const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${this.apiKey}`
            const response = await axios.get(apiUrl)
            if (response.data.items.length === 0) {
                throw new Error('No video found on YouTube')
            }
            const video = response.data.items[0]
            return `https://www.youtube.com/watch?v=${video.id.videoId}`
        } catch (error) {
            console.error('YouTube search error:', error)
            throw error
        }
    }
}

export default CustomExtractor
