import { execSync } from 'node:child_process'
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

  // outputDirectory += ``

  //   if (!fs.existsSync(`${outputDirectory}`)) {
  //     fs.mkdir(`${outputDirectory}`, (err) => {
  //       if (err) throw err // не удалось создать папки
  //     })
  //   }
  console.log(path)
  for (const { resolution, name } of resolutions) {
    //const outputHLS = `${outputDirectory}/${id_film}_${name}.m3u8`
    //const ffmpegCommand = `ffmpeg -i ${path} -c:v libx264 -c:a aac -vf scale=${resolution} -hls_time 10 -hls_list_size 0 -hls_segment_filename ${outputDirectory}/${id_film}_${name}_%03d.ts ${outputHLS}`
    //execSync(ffmpegCommand)
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

export async function generateVideoTest({ path, id_film, type }: { path: string; id_film: number; type: 'trailer' | 'film' }) {
  const resolutions = [
    { id: 0, resolution: '1920x1080', name: '1080p' },
    //{id:1, resolution: '1280x720', name: '720p' },
    //{id:2, resolution: '854x480', name: '480p' },
    //{id:3, resolution: '640x360', name: '360p'}
  ]

  let outputDirectory = `assets/${id_film}`
  if (!fs.existsSync(`${outputDirectory}`)) {
    fs.mkdir(`${outputDirectory}`, (err) => {
      if (err) throw err // не удалось создать папки
    })
  }

  outputDirectory += `/${type}`

  if (!fs.existsSync(`${outputDirectory}`)) {
    fs.mkdir(`${outputDirectory}`, (err) => {
      if (err) throw err // не удалось создать папки
    })
  }
  console.log(path)

  for (const { resolution, name } of resolutions) {
    const outputHLS = `${outputDirectory}/${id_film}_${name}.m3u8`
    const ffmpegCommand = `ffmpeg -y -i ${path} -map_metadata -1 -map 0:v:0 -map 0:a:0 -map 0:a:1 -map 0:a:2 -map 0:a:3 -map 0:a:4 -map 0:a:5 -map 0:a:6 -map 0:a:7  -vcodec libx264 -pix_fmt yuv420p -vsync 1 -async 1 -color_primaries 1 -color_trc 1 -colorspace 1 -vf scale="'w=if(gt(a,16/9),640,-2):h=if(gt(a,16/9),-2,360)'" -ab 128k -maxrate 800k -bufsize 1200k -bufsize 4200k -acodec aac -ac 2 -ab 128k -f hls -hls_time 4 -hls_playlist_type event ${outputDirectory}/stream.m3u8`
    execSync(ffmpegCommand)
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
