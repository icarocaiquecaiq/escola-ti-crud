import { IsString } from 'class-validator';

export class GetCharacterInputDTO {
  @IsString()
  id: string;
}
