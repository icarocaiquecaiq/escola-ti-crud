import { IsEnum, IsInt, IsPositive, IsString, Max } from 'class-validator';

export enum ItemType {
  GUN = 'GUN',
  ARMOUR = 'ARMOUR',
  AMULET = 'AMULET',
}

export class CreateMagicItemInputDTO {
  @IsString()
  name: string;

  @IsEnum(ItemType, {
    message: 'Item Type must be GUN | ARMOUR | AMULET',
  })
  itemType: ItemType;

  @IsInt()
  @Max(10)
  strength: number;

  @IsInt()
  @Max(10)
  defense: number;
}
