import { spawn } from 'child_process'
import * as fs from 'node:fs'
export async function convertToHls(path: string, id_film: number, type: 'film' | 'trailer', resolution: string, name: string) {
  const mp4OutputPath = `./upload/output.mp4`
  const hlsOutputPath = `assets/${id_film}/${type}/${id_film}_${name}.m3u8`

  return new Promise((resolve, reject) => {
    // Конвертация MKV в MP4

    //const ffmpegMkvToMp4Process = spawn('ffmpeg', ['-i', path, '-c:v', 'copy', '-c:a', 'aac', mp4OutputPath])
    const ffmpegMkvToMp4Process = spawn('ffmpeg', ['-i', path, '-c:v', 'libx264', '-c:a', 'aac', '-strict', 'experimental', '-b:a', '128k', mp4OutputPath])

    ffmpegMkvToMp4Process.stdout.on('data', (data) => {
      console.log(`MKV to MP4 stdout: ${data}`)
    })

    ffmpegMkvToMp4Process.stderr.on('data', (data) => {
      console.error(`MKV to MP4 stderr: ${data}`)
    })

    ffmpegMkvToMp4Process.on('close', (code) => {
      console.log(`MKV to MP4 child process exited with code ${code}`)
      if (code !== 0) {
        reject(new Error(`MKV to MP4 FFmpeg process exited with code ${code}`))
        return
      }

      // Конвертация MP4 в M3U8
      const ffmpegMp4ToHlsProcess = spawn('ffmpeg', [
        '-i',
        mp4OutputPath,
        '-c:v',
        'libx264',
        '-c:a',
        'aac',
        '-vf',
        `scale=${resolution}`,
        '-f',
        'hls',
        '-hls_time',
        '10',
        '-hls_list_size',
        '0',
        hlsOutputPath,
      ])

      ffmpegMp4ToHlsProcess.stdout.on('data', (data) => {
        console.log(`MP4 to HLS stdout: ${data}`)
      })

      ffmpegMp4ToHlsProcess.stderr.on('data', (data) => {
        console.error(`MP4 to HLS stderr: ${data}`)
      })

      ffmpegMp4ToHlsProcess.on('close', (code) => {
        console.log(`MP4 to HLS child process exited with code ${code}`)
        if (code === 0) {
          fs.unlinkSync(mp4OutputPath)
          resolve(hlsOutputPath)
        } else {
          reject(new Error(`MP4 to HLS FFmpeg process exited with code ${code}`))
        }
      })
    })
  })
}
