import { Module } from '@nestjs/common';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([Level]),
  ],
  controllers: [LevelsController],
  providers: [LevelsService],
  exports: [LevelsService]
})
export class LevelsModule {}
