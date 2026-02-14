

import { Controller, Get, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { ScoresService } from '../scores/scores.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly scoresService: ScoresService,
  ) {}
  
//-----------------code fct------------------
  // Récupérer les questions d'un quiz
   @Get(':quizId/questions')
   getQuestionsByQuiz(
     @Param('quizId', ParseIntPipe) quizId: number) {

  return this.quizzesService.getQuestionsByQuiz(quizId);
   }

  

  //----------------------------------------
  // START QUIZ (optionnel)
  @Get(':level/:quizId')
  startQuiz(
    @Param('level', ParseIntPipe) level: number,
    @Param('quizId', ParseIntPipe) quizId: number
  ) {
    return this.quizzesService.startQuiz(level, quizId);
  }

  // Récupérer toutes les questions pour un quiz donné (par level + numéro de quiz)
  @Get(':level/:quizId/questions')
  getQuestionsByLevelAndNumber(
    @Param('level', ParseIntPipe) level: number,
    @Param('quizId', ParseIntPipe) quizId: number,
  ) {
    return this.quizzesService.getQuestionsByLevelAndNumber(level, quizId);
  }

  // Simple query-based endpoint for beginner-friendly access:
  // GET /quizzes?level=1&quiz=1  -> returns questions for that level+quiz
  @Get()
  async getQuestionsByQuery(
    @Query('level') level?: string,
    @Query('quiz') quiz?: string,
  ) {
    // Simple, beginner-friendly query endpoint:
    // - /quizzes?level=2&quiz=1  -> questions for level 2 quiz 1
    // - /quizzes?quiz=5          -> questions for quiz id 5 (legacy)
    const lvl = level ? parseInt(level, 10) : undefined;
    const qid = quiz ? parseInt(quiz, 10) : undefined;

    if (typeof lvl === 'number' && !isNaN(lvl) && typeof qid === 'number' && !isNaN(qid)) {
      return this.quizzesService.getQuestionsByLevelAndNumber(lvl, qid);
    }

    if (typeof qid === 'number' && !isNaN(qid)) {
      return this.quizzesService.getQuestionsByQuiz(qid);
    }

    return { error: 'Provide ?quiz=<quizId> or ?level=<level>&quiz=<quizNumber>' };
  }

  // FINISH QUIZ → calculer le score
  @Post(':level/:quizId/finish')
  async finishQuiz(
    @Param('level', ParseIntPipe) level: number,
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body() body: { userId: number; answers: number[] } // réponses sélectionnées
  ) {
    const { userId, answers } = body;
    // Delegate score calculation and persistence to ScoresService (MVC separation)
    // NOTE: the frontend passes quizId as the quiz NUMBER (1..3). We must resolve the
    // actual DB quiz.id for the given level + quiz number before calculating score.
    const quizEntity = await this.quizzesService.getQuizByLevelAndNumber(level, quizId);
    if (!quizEntity) {
      return { success: false, message: 'Quiz not found for given level/number' };
    }

    // Use the real DB id when calculating/saving score
    return this.scoresService.calculateAndSaveScore(userId, quizEntity.id, answers);
  }
}
