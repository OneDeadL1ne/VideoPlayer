import { Controller } from '@nestjs/common';
import { FilmService } from './film.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("film")
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}
}
