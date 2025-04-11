import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MagicItemService } from './magic-item.service';
import { CreateMagicItemInputDTO } from './dto/input/create-magic-item-input.dto';

@Controller('magic-item')
export class MagicItemController {
  constructor(private readonly magicItemService: MagicItemService) {}

  @Post()
  async handleCreateMagicItem(@Body() magicItemInput: CreateMagicItemInputDTO) {
    return await this.magicItemService.createMagicItem(magicItemInput);
  }

  @Delete(':id')
  async handleDeleteMagicItem(@Param('id') id: string) {
    return await this.magicItemService.deleteMagicItem(id);
  }

  @Post(':magicItemId/add-to-character/:characterId')
  async handleAddMagicItemToCharacter(
    @Param('magicItemId') magicItemId: string,
    @Param('characterId') characterId: string,
  ) {
    return await this.magicItemService.addMagicItemToCharacter(
      magicItemId,
      characterId,
    );
  }

  @Get(':id')
  async handleGetMagicItemById(@Param('id') magicItemId: string) {
    return await this.magicItemService.getMagicItemById(magicItemId);
  }

  @Get()
  async handleGetAllMagicItem() {
    return await this.magicItemService.getAllMagicItem();
  }

  @Delete(':magicItemId/remove-to-character/:characterId')
  async handleRemoveMagicItemToCharacter(
    @Param('magicItemId') magicItemId: string,
    @Param('characterId') characterId: string,
  ) {
    return await this.magicItemService.removeMagicItemToCharacter(
      magicItemId,
      characterId,
    );
  }
}
