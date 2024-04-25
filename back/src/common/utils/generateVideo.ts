import { execSync } from "node:child_process";
import * as fs from "node:fs"

export async function generateVideo({path, id_film, type}:{path:string, id_film:number, type:"trailer" | "film"}){
    const resolutions = [
        {id:0, resolution: '1920x1080', name: '1080p' },
        //{id:1, resolution: '1280x720', name: '720p' },
        //{id:2, resolution: '854x480', name: '480p' },
        //{id:3, resolution: '640x360', name: '360p'}
        
    ];
    

    let outputDirectory = `assets/${id_film}`;
    if(!fs.existsSync(`${outputDirectory}`)){
        fs.mkdir(`${outputDirectory}`,err => {
            if(err) throw err; // не удалось создать папки
         })
    }
    
    outputDirectory+=`/${type}`

    if(!fs.existsSync(`${outputDirectory}`)){
        fs.mkdir(`${outputDirectory}`,err => {
            if(err) throw err; // не удалось создать папки
        })
    }
    console.log(path)
    for (const {resolution, name} of resolutions) {
        const outputHLS = `${outputDirectory}/${id_film}_${name}.m3u8`;
        const ffmpegCommand = `ffmpeg -i ${path} -c:v libx264 -c:a aac -vf scale=${resolution} -hls_time 10 -hls_list_size 0 -hls_segment_filename ${outputDirectory}/${id_film}_${name}_%03d.ts ${outputHLS}`;
        execSync(ffmpegCommand)
    }
    fs.writeFileSync(`${outputDirectory}/${id_film}.m3u8`,`#EXTM3U
            #EXT-X-VERSION:3
            
            #EXT-X-STREAM-INF:BANDWIDTH=4000000,RESOLUTION=1920x1080
            ${id_film}_1080p.m3u8
            
            #EXT-X-STREAM-INF:BANDWIDTH=2000000,RESOLUTION=1280x720
            ${id_film}_720p.m3u8
            
            #EXT-X-STREAM-INF:BANDWIDTH=1200000,RESOLUTION=854x480
            ${id_film}_480p.m3u8
            
            #EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360                
            ${id_film}_360p.m3u8`)
        
            return true
    
}