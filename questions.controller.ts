import { Controller, Get, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('quiz/:quizId')
  getQuestionsByQuiz(@Param('quizId') quizId: number) {
    return this.questionsService.getQuestionsByQuiz(quizId);
  }
}
