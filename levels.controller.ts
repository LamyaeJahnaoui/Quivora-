import { Controller, Get, Param } from '@nestjs/common';
import { LevelsService } from './levels.service';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get()
  getAllLevels() {
    return this.levelsService.getAllLevels();
  }

  @Get(':id')
  getLevel(@Param('id') id: number) {
    return this.levelsService.getLevelById(Number(id));
  }
}
