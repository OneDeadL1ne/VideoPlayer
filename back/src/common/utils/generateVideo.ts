//import { execSync } from 'node:child_process'
import * as fs from 'node:fs'
import { convertToHls } from './convertMkvToHls'

export async function generateVideo({ path, id_film, type }: { path: string; id_film: number; type: 'trailer' | 'film' }) {
  const resolutions = [
    { id: 0, resolution: '1920x1080', name: '1080p' },
    { id: 1, resolution: '1280x720', name: '720p' },
    { id: 2, resolution: '854x480', name: '480p' },
    { id: 3, resolution: '640x360', name: '360p' },
  ]

  const outputDirectory = `assets/${id_film}/${type}`
  if (!fs.existsSync(`${outputDirectory}`)) {
    fs.mkdirSync(`${outputDirectory}`, { recursive: true })
  }

  for (const { resolution, name } of resolutions) {
    await convertToHls(path, id_film, type, resolution, name)
  }
  fs.writeFileSync(
    `${outputDirectory}/${id_film}.m3u8`,
    `#EXTM3U
            #EXT-X-VERSION:3
            
            #EXT-X-STREAM-INF:BANDWIDTH=4000000,RESOLUTION=1920x1080
            ${id_film}_1080p.m3u8
            
            #EXT-X-STREAM-INF:BANDWIDTH=2000000,RESOLUTION=1280x720
            ${id_film}_720p.m3u8
            
            #EXT-X-STREAM-INF:BANDWIDTH=1200000,RESOLUTION=854x480
            ${id_film}_480p.m3u8
            
            #EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360                
            ${id_film}_360p.m3u8`,
  )

  return true
}
