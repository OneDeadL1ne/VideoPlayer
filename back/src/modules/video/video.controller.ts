import { Controller, Get, Header, HttpStatus, Param, Post, Query, Res, UploadedFiles,Headers, UseInterceptors } from '@nestjs/common';
import { VideoService } from './video.service';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from "node:fs"
import { Response } from 'express';


@ApiTags("video")
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
    @Post()
    @UseInterceptors(
      FilesInterceptor('files', 3, {
        
        fileFilter: (req, file, callback) => {
          if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif|mp4|mkv)/))) callback(null, false)
          callback(null, true)
        },
        storage:diskStorage({
          destination:(req, file, callback)=> {
            let directory = "./upload/films"
            if(!fs.existsSync(`${directory}/${req.query.id_film}`)){
              fs.mkdir(`${directory}/${req.query.id_film}`,err => {
                if(err) throw err; // не удалось создать папки
               })
            }
            
            
            

            directory += `/${req.query.id_film}`  
            
            console.log(directory,file)

            
            
            callback(null, `${directory}`)
          },
          filename:(req, file, callback)=> {
            const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
              return callback(null, `${req.query.type}-${randomName}${extname(file.originalname)}` )
          },
        })
      }),
    )
    async uploadVideo(@Query("id_film") id_film:number,@Query("type") type:"trailer"|"film",@UploadedFiles() files:Array<Express.Multer.File>) {
      
      return this.videoService.generateMedia(id_film, files, type)
    }

    @Get('stream/:type/:id/:playlist')
    @Header('Content-Type', 'application/x-mpegurl')
    async getStreamVideoPlaylist(
          @Param('id') id: string,
          @Param('type') type: string,
          @Param('playlist') playlist: string,
          @Headers() headers,
          @Res() res: Response
        ) {
          
          
          
      
          const videoPath = `assets/${id}/${type}/${playlist}`;
          
          
          
          
          const readStreamfile = fs.createReadStream(videoPath);
          
          res.writeHead(HttpStatus.PARTIAL_CONTENT); //206
            
          readStreamfile.pipe(res);          
      }	
  }

