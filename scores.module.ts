import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { User } from '../users/entities/user.entity';
import { Quiz } from '../quizzes/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, User, Quiz])],
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [ScoresService],
})
export class ScoresModule {}
