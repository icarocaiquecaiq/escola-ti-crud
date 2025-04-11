import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';
import { MagicItemController } from './magic-item.controller';
import { MagicItemService } from './magic-item.service';

@Module({
  imports: [PrismaModule],
  controllers: [MagicItemController],
  providers: [MagicItemService],
})
export class MagicItemModule {}
