import { Controller, Get, Header, HttpStatus,Headers, Param, Res } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream, createWriteStream} from 'fs';
import { Response } from 'express';
import {exec} from 'child_process';

import m3u8stream from 'm3u8stream';





@ApiTags("trailer")
@Controller('trailer')
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}

 
	// @Get('stream/:id')
	// @Header('Accept-Ranges', 'bytes')
	// @Header('Content-Type', 'video/mp4')
	// async getStreamVideo(
	// 	@Param('id') id: string,
	// 	@Headers() headers,
	// 	@Res() res: Response
	// ) {
	// 	const videoPath = `assets/${id}.mp4`;
	// 	const { size } = statSync(videoPath);
	// 	const videoRange = headers.range;
	// 	if (videoRange) {
	// 		const parts = videoRange.replace(/bytes=/, '').split('-');
	// 		const start = parseInt(parts[0], 10);
	// 		const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
	// 		const chunkSize = end - start + 1;
	// 		const readStreamfile = createReadStream(videoPath, {
	// 			start,
	// 			end,
	// 			highWaterMark: 60,
	// 		});
	// 		const head = {
	// 			'Content-Range': `bytes ${start}-${end}/${size}`,
	// 			'Content-Length': chunkSize,
	// 		};
	// 		res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
			
	// 		readStreamfile.pipe(res);
	// 	} else {
	// 		const head = {
	// 			'Content-Length': size,
	// 		};
	// 		res.writeHead(HttpStatus.OK, head);
	// 		 //200
	// 		createReadStream(videoPath).pipe(res);
	// 	}
	//}

	
	
	// @Get('stream/:resolution')
	// @Header('Content-Type', 'application/x-mpegurl')
	// async getStreamVideo(
	// 	@Param('resolution') resolution: string,
	// 	@Headers() headers,
	// 	@Res() res: Response
	// ) {
	// 	const resolutions = {
	// 		'360p': 'output_360p.m3u8',
	// 		'480p': 'output_480p.m3u8',
	// 		'720p': 'output_720p.m3u8'
	// 	};
		
	// 	const fileName = resolutions[resolution];

    // 	if (!fileName) {
    //     	return res.status(404).send('Resolution not found');
    // 	}

	// 	const videoPath = `assets/output/${fileName}`;
		
	// 	console.log(videoPath)
		
		
	// 	const readStreamfile = createReadStream(videoPath);
			
	// 	res.writeHead(HttpStatus.PARTIAL_CONTENT); //206
			
	// 	readStreamfile.pipe(res);
		
	// 	//res.set('Content-Type', 'application/x-mpegurl');	
	// 		//200
	// 	//createReadStream(videoPath).pipe(res);
	// 	//const readStream = createWriteStream(videoPath);
    // 	//readStream.pipe(res);
	// 	//m3u8stream("http://localhost:3002/trailer/video.m3u8").pipe(readStream)
	// 	}
	

	@Get('stream/:id')
	@Header('Content-Type', 'application/x-mpegurl')
	async getStreamVideoPlaylist(
			@Param('id') id: string,
			@Headers() headers,
			@Res() res: Response
		) {
			
			
			
	
			const videoPath = `assets/output/${id}`;
			
			
			
			
			const readStreamfile = createReadStream(videoPath);
				
			res.writeHead(HttpStatus.PARTIAL_CONTENT); //206
				
			readStreamfile.pipe(res);
			
			//res.set('Content-Type', 'application/x-mpegurl');	
				//200
			//createReadStream(videoPath).pipe(res);
			//const readStream = createWriteStream(videoPath);
			//readStream.pipe(res);
			//m3u8stream("http://localhost:3002/trailer/video.m3u8").pipe(readStream)}
	}	


	@Get('stream/')
	
	@Header('Content-Type', 'application/x-mpegURL')
	async getStreamVideoM3U8(
		
	) {
		const resolutions = [
			{ resolution: '1920x1080', name: '1080p', file:"3" },
			{ resolution: '1280x720', name: '720p', file:"3"},
			{ resolution: '854x480', name: '480p', file:"3" },
			{ resolution: '640x360', name: '360p', file:"3" }
			
		];
		const videoPath = `assets/3.mp4`;
		const outputDirectory = 'assets/output';

		resolutions.map(({ resolution, name, file }) => {
			const outputHLS = `${outputDirectory}/${file}_${name}.m3u8`;
			const ffmpegCommand = `ffmpeg -i ${videoPath} -c:v libx264 -c:a aac -vf scale=${resolution} -hls_time 10 -hls_list_size 0 -hls_segment_filename ${outputDirectory}/${file}_${name}_%03d.ts ${outputHLS}`;
		
			exec(ffmpegCommand, (error, stdout, stderr) => {
				if (error) {
					console.error(`Error during conversion for ${name}: ${error.message}`);
					return;
				}
				if (stderr) {
					console.error(`Conversion process encountered an error for ${name}: ${stderr}`);
					return;
				}
				console.log(`Video conversion to HLS (${name}) completed successfully.`);
			});
		});
		
		return null
	}
	

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.trailerService.findOne(+id);
	}
}
