import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class HelloDTO{
    @IsString()
    @ApiProperty()
    hello:string
}