
import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {

  constructor(
    private readonly rankingService: RankingService,
  ) {}

  @Get()
  async getGlobalRanking() {
    return await this.rankingService.getGlobalRanking();
  }

  @Get('quiz/:id')
  getRanking(@Param('id') quizId: number) {
    return this.rankingService.getRankingByQuiz(Number(quizId));
  }
}
