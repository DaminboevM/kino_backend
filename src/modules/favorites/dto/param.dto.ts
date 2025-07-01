import { IsUUID } from "class-validator";

export class ParamDto {
    @IsUUID()
    id: string
}