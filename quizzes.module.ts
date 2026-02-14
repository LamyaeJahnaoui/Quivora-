import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { ScoresModule } from '../scores/scores.module';

import { Quiz } from './entities/quiz.entity';
import { Level } from '../levels/entities/level.entity';
import { Question } from '../questions/entities/question.entity';
import { Score } from '../scores/entities/score.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Level, Question, Score, User]),
    ScoresModule,
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService],
})
export class QuizzesModule {}
