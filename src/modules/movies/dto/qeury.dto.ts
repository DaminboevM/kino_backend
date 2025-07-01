import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class MoveQueryDto {
    
    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    category?: string

    @ApiProperty({required: false})               
    @IsString()
    @IsOptional()
    search?: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    subscription_type?: 'free' | 'premium'

    @ApiProperty({required: false})
    @Type(() => Number)
    @IsOptional()
    limit?: number

    @ApiProperty({required: false})
    @Type(() => Number)
    @IsOptional()
    page?: number

    @ApiProperty({required: false})                                                                                                                               
    @IsNumber()
    @IsOptional()
    year?: number

    @ApiProperty({required: false})                                                                              
    @IsNumber()
    @IsOptional()
    rating?: string

}
