import { ApiProperty } from "@nestjs/swagger";
import {  IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class UserSubscriptionCreateDto {

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    plan_id: string
}