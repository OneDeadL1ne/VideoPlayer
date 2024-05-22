import { spawn } from 'child_process'

export async function convertToHls(path: string, id_film: number, type: 'film' | 'trailer', resolution: string, name: string) {
  const hlsOutputPath = `assets/${id_film}/${type}/${id_film}_${name}.m3u8`

  return new Promise((resolve, reject) => {
    const ffmpegMp4ToHlsProcess = spawn('ffmpeg', [
      '-i',
      path,
      '-sn',
      '-vf',
      'scale=1280:-1',
      '-c:v',
      'libx264',
      '-preset',
      'veryfast',
      '-g',
      '48',
      '-sc_threshold',
      '0',
      '-b:v',
      '2500k',
      '-maxrate',
      '2500k',
      '-bufsize',
      '2500k',
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      '-ac',
      '2',
      '-hls_time',
      '4',
      '-hls_playlist_type',
      'vod',
      '-hls_segment_filename',
      `assets/${id_film}/${type}/${id_film}_${name}_%03d.ts`,
      hlsOutputPath,
    ])
    ffmpegMp4ToHlsProcess.stdout.on('data', (data) => {
      console.log(`MP4 to HLS stdout: ${data}`)
    })

    ffmpegMp4ToHlsProcess.stderr.on('data', (data) => {
      console.error(`MP4 to HLS stderr: ${data}`)
    })

    // ffmpegMp4ToHlsProcess.stderr.on('error', (data) => {
    //   console.error(`MP4 to HLS error: ${data}`)
    // })

    ffmpegMp4ToHlsProcess.on('close', (code) => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(new Error(code.toString()))
      }
    })
  })
}
