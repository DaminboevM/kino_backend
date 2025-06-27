import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UserUpdateDto {

    @IsString()
    @IsNotEmpty()
    @IsUUID('4')
    id: string

    @IsOptional()
    @IsString()
    username?: string

    @IsOptional()
    @IsString()
    password?: string

    @IsOptional()
    @IsString()
    email?: string
}