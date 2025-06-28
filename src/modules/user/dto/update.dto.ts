import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class UserUpdateDto {
    

    @IsOptional()
    @IsString()
    username?: string
   

    @IsOptional()
    @IsString()
    email?: string


    @IsOptional()
    @IsString()
    password?: string


    @IsString()
    @IsOptional()
    avatar_url?: string


    @IsPhoneNumber()
    @IsOptional()
    phone: string


    @IsString()
    @IsOptional()
    country: string
}