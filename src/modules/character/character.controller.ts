import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterInputDTO } from './dto/input/character-input.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  async handleCreateCharacter(@Body() inputCharacter: CharacterInputDTO) {
    return await this.characterService.createCharacter(inputCharacter);
  }

  @Get()
  async handleGetAllCharacter() {
    return await this.characterService.getAllCharacter();
  }

  @Get(':id')
  async handleGetCharacterById(@Param('id') id: string) {
    return await this.characterService.getCharacterById(id);
  }

  @Put(':id')
  async handleUpdateNameByCharacterId(
    @Param('id') id: string,
    @Body() name: string,
  ) {
    return await this.characterService.updateNameByCharacterId({ name, id });
  }

  @Get('amulet/:id')
  async handleGetAmuletCharacterById(@Param('id') id: string) {
    return await this.characterService.getAmuletCharacterById(id);
  }

  @Get(':characterId/magic-item')
  async handleGetMagicItemCharacterById(
    @Param('characterId') characterId: string,
  ) {
    return await this.characterService.getMagicItemCharacterById(characterId);
  }

  @Delete(':id')
  async handleDeleteCharacter(@Param('id') id: string) {
    return await this.characterService.deleteCharacter(id);
  }
}
