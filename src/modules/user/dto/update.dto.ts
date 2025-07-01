import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class UserUpdateDto {
    

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    username?: string
   
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    email?: string

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    password?: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    avatar_url?: string

    @ApiProperty({required: false})
    @IsPhoneNumber()
    @IsOptional()
    phone?: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    country?: string
}