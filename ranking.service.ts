import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from '../scores/entities/score.entity';

@Injectable()
export class RankingService {

  constructor(
    @InjectRepository(Score)
    private readonly ScoreRepo: Repository<Score>,
  ) {}

  async getRankingByQuiz(quizId: number) {

    // Use INNER JOIN on user to ignore orphaned scores (scores referencing deleted users)
    return await this.ScoreRepo
      .createQueryBuilder('score')
      .innerJoin('score.user', 'user')
      .innerJoin('score.quiz', 'quiz')
      .select('user.id', 'userId')
      .addSelect('user.nom', 'nom')
      .addSelect('SUM(score.points)', 'totalPoints')
      .where('quiz.id = :quizId', { quizId })
      .groupBy('user.id')
      .addGroupBy('user.nom')
      .orderBy('totalPoints', 'DESC')
      .getRawMany();
  }

  async getGlobalRanking() {
    // Use INNER JOIN on user to ensure only existing users are included
    return await this.ScoreRepo
      .createQueryBuilder('score')
      .innerJoin('score.user', 'user')
      .select('user.id', 'userId')
      .addSelect('user.nom', 'nom')
      .addSelect('user.email', 'email')
      .addSelect('COALESCE(SUM(score.points), 0)', 'totalPoints')
      .groupBy('user.id')
      .addGroupBy('user.nom')
      .addGroupBy('user.email')
      .orderBy('COALESCE(SUM(score.points), 0)', 'DESC')
      .getRawMany();
  }
}
