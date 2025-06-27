import { IsUUID } from 'class-validator';

export class UuidParamDto {
  @IsUUID('4', { message: 'The ID is in the wrong format. It must be a UUID v4..' })
  id: string;
}