import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMagicItemInputDTO } from './dto/input/create-magic-item-input.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MagicItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMagicItem(magicItemInput: CreateMagicItemInputDTO) {
    try {
      if (magicItemInput.strength <= 0 || magicItemInput.defense <= 0) {
        throw new BadRequestException(
          'At least one strength end defense must be greater than 0',
        );
      }
      let strength: number = magicItemInput.strength;
      let defense: number = magicItemInput.defense;

      if (magicItemInput.itemType === 'GUN') {
        defense = 0;
      }

      if (magicItemInput.itemType === 'ARMOUR') {
        strength = 0;
      }

      const createdMagicItem = await this.prismaService.magicItem.create({
        data: {
          name: magicItemInput.name,
          itemType: magicItemInput.itemType,
          strength: strength,
          defense: defense,
        },
      });

      return createdMagicItem;
    } catch (error) {
      throw error;
    }
  }

  async addMagicItemToCharacter(magicItemId: string, characterId: string) {
    try {
      if (!magicItemId) {
        return new BadRequestException('id does not exists');
      }

      const findMagicItemTypeById =
        await this.prismaService.magicItem.findUnique({
          where: {
            id: +magicItemId,
          },
        });

      if (!findMagicItemTypeById) {
        throw new NotFoundException('Magic item by id not found');
      }

      if (!characterId) {
        return new BadRequestException('id does not exists');
      }

      const findCharacterById = await this.prismaService.character.findUnique({
        where: {
          id: +characterId,
        },
      });

      if (!findCharacterById) {
        throw new NotFoundException('Character by id not found');
      }

      if (findMagicItemTypeById.itemType === 'AMULET') {
        const existingAmulet = await this.prismaService.magicItem.findFirst({
          where: {
            ownerId: +characterId,
            itemType: 'AMULET',
          },
        });

        if (existingAmulet) {
          throw new BadRequestException('Character already have an amulet.');
        }
      }

      await this.prismaService.magicItem.update({
        where: { id: +magicItemId },
        data: {
          ownerId: +characterId,
        },
      });

      return { message: 'Item mágico adicionado ao personagem com sucesso!' };
    } catch (error) {
      return error;
    }
  }

  async getMagicItemById(magicItemId: string) {
    const foundedMagicItem = await this.prismaService.magicItem.findUnique({
      where: { id: +magicItemId },
    });

    if (!foundedMagicItem) {
      throw new NotFoundException('Magic item not found by id');
    }

    return foundedMagicItem;
  }

  async getAllMagicItem() {
    return await this.prismaService.magicItem.findMany();
  }

  async removeMagicItemToCharacter(magicItemId: string, characterId: string) {
    try {
      if (!magicItemId) {
        return new BadRequestException('id does not exists');
      }

      const findMagicItemTypeById =
        await this.prismaService.magicItem.findUnique({
          where: {
            id: +magicItemId,
          },
        });

      if (!findMagicItemTypeById) {
        throw new NotFoundException('Magic item by id not found');
      }

      if (!characterId) {
        return new BadRequestException('id does not exists');
      }

      const findCharacterById = await this.prismaService.character.findUnique({
        where: {
          id: +characterId,
        },
      });

      if (!findCharacterById) {
        throw new NotFoundException('Character by id not found');
      }

      await this.prismaService.magicItem.update({
        where: { id: +magicItemId },
        data: {
          ownerId: null,
        },
      });

      return { message: 'Item mágico removido do personagem com sucesso' };
    } catch (error) {
      return error;
    }
  }

  async deleteMagicItem(id: string) {
    try {
      if (!id) {
        return new BadRequestException('id does not exists');
      }

      const findMagicItemTypeById =
        await this.prismaService.magicItem.findUnique({
          where: {
            id: +id,
          },
        });

      if (!findMagicItemTypeById) {
        throw new NotFoundException('Magic item by id not found');
      }

      const deletedMagicItemType = await this.prismaService.magicItem.delete({
        where: {
          id: +id,
        },
      });

      return deletedMagicItemType;
    } catch (error) {
      return error;
    }
  }
}

// async deleteCharacter(id: string) {
//     try {
//       if (!id) {
//         return new BadRequestException('id does not exists');
//       }
//       const findCharacterById = await this.prismaService.character.findUnique({
//         where: {
//           id: +id,
//         },
//       });

//       if (!findCharacterById) {
//         throw new NotFoundException('User does not exists');
//       }

//       await this.prismaService.character.delete({
//         where: {
//           id: +id,
//         },
//       });
//       return findCharacterById;
//     } catch (error) {
//       throw error;
//     }
//   }
