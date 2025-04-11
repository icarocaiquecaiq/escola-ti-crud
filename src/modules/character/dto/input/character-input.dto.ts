import { IsEnum, IsInt, IsPositive, IsString, Max } from 'class-validator';

export enum Class {
  WARRIOR = 'WARRIOR',
  WIZARD = 'WIZARD',
  ARCHER = 'ARCHER',
  ROGUE = 'ROGUE',
  BARD = 'BARD',
}

export class CharacterInputDTO {
  @IsString()
  name: string;

  @IsString()
  adventurousName: string;

  @IsEnum(Class, {
    message: 'class must be one of: WARRIOR, WIZARD, ARCHER, ROGUE, BARD',
  })
  class: Class;

  @IsInt()
  level: number;

  @IsInt()
  @Max(10)
  strength: number;

  @IsInt()
  @Max(10)
  defense: number;
}
