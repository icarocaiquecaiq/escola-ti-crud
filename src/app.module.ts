import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './modules/character/character.module';
import { MagicItemModule } from './modules/magic-item/magic-item.module';

@Module({
  imports: [CharacterModule, MagicItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
