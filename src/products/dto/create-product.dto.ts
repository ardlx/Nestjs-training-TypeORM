import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt } from "class-validator";

//@ApiProperty used for swagger API documentation
export class CreateProductDto {

    @ApiProperty()
    prodId : string

    @ApiProperty()
    @IsString()
    name : string
    
    @ApiProperty()
    @IsString()
    description : string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    price : number

    @ApiProperty()
    createdAt : Date

    @ApiProperty()
    updatedAt : Date

}