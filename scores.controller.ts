import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ScoresService } from './scores.service';

class CreateScoreDto {
  userId: number;
  quizId: number;
  points: number;
}

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  async createScore(@Body() createScoreDto: CreateScoreDto) {
    const { userId, quizId, points } = createScoreDto;
    return this.scoresService.createScore(userId, quizId, points);
  }

  @Get('user/:userId')
  async getScoresByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.scoresService.getScoresByUser(userId);
  }

  @Get('user/:userId/quiz/:quizId')
  async getScoreByUserAndQuiz(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('quizId', ParseIntPipe) quizId: number,
  ) {
    return this.scoresService.getScoreByUserAndQuiz(userId, quizId);
  }

  @Put(':scoreId')
  async updateScore(
    @Param('scoreId', ParseIntPipe) scoreId: number,
    @Body('points', ParseIntPipe) points: number,
  ) {
    return this.scoresService.updateScore(scoreId, points);
  }

  @Delete(':scoreId')
  async deleteScore(@Param('scoreId', ParseIntPipe) scoreId: number) {
    return this.scoresService.deleteScore(scoreId);
  }
}
