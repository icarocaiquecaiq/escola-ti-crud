import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CharacterInputDTO } from './dto/input/character-input.dto';
import { error } from 'console';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CharacterService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCharacter(characterInput: CharacterInputDTO) {
    try {
      if (characterInput.strength + characterInput.defense < 10) {
        throw new BadRequestException(
          'Sum of strength and Defense must be less than 10',
        );
      }

      const createdCharacter = await this.prismaService.character.create({
        data: {
          name: characterInput.name,
          adventurousName: characterInput.adventurousName,
          class: characterInput.class,
          level: characterInput.level,
          strength: characterInput.strength,
          defense: characterInput.defense,
        },
      });

      return createdCharacter;
    } catch (error) {
      throw error;
    }
  }

  async getAllCharacter() {
    const characters = await this.prismaService.character.findMany({
      include: {
        magicItems: true,
      },
    });

    const charactersWithStats = characters.map((character) => {
      const itemStrength = character.magicItems.reduce(
        (total, item) => total + item.strength,
        0,
      );

      const itemDefense = character.magicItems.reduce(
        (total, item) => total + item.defense,
        0,
      );

      return {
        ...character,
        totalStrength: character.strength + itemStrength,
        totalDefense: character.defense + itemDefense,
      };
    });

    return charactersWithStats;
  }

  async getCharacterById(characterId: string) {
    const character = await this.prismaService.character.findUnique({
      where: { id: +characterId },
      include: {
        magicItems: true,
      },
    });

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    const itemStrength = character.magicItems.reduce(
      (total, item) => total + item.strength,
      0,
    );

    const itemDefense = character.magicItems.reduce(
      (total, item) => total + item.defense,
      0,
    );

    const totalStrength = character.strength + itemStrength;
    const totalDefense = character.defense + itemDefense;

    return {
      ...character,
      totalStrength,
      totalDefense,
    };
  }

  async amuletCharacterById(characterId: string) {
    const character = await this.prismaService.character.findUnique({
      where: { id: +characterId },
      include: {
        magicItems: {
          where: { itemType: 'AMULET' },
        },
      },
    });

    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character.magicItems.filter((e) => e.itemType === 'AMULET');
  }

  async updateNameByCharacterId(body: { name: string; id: string }) {
    console.log(body.name);
    const updatedCharacter = this.prismaService.character.update({
      where: { id: +body.id },
      data: { adventurousName: body.name },
    });

    return updatedCharacter;
  }

  async deleteCharacter(id: string) {
    try {
      if (!id) {
        return new BadRequestException('id does not exists');
      }
      const findCharacterById = await this.prismaService.character.findUnique({
        where: {
          id: +id,
        },
      });

      if (!findCharacterById) {
        throw new NotFoundException('User does not exists');
      }

      await this.prismaService.character.delete({
        where: {
          id: +id,
        },
      });
      return findCharacterById;
    } catch (error) {
      throw error;
    }
  }
}
