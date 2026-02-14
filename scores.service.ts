import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { User } from '../users/entities/user.entity';
import { Quiz } from '../quizzes/entities/quiz.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  // CREATE OR UPDATE SCORE
  async createScore(userId: number, quizId: number, points: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) return { success: false, message: 'User not found' };

      const quiz = await this.quizRepository.findOneBy({ id: quizId });
      if (!quiz) return { success: false, message: 'Quiz not found' };

      // Vérifie si score existant pour ce user & quiz
      let score = await this.scoreRepository.findOne({
        where: { user: { id: userId }, quiz: { id: quizId } },
      });

      if (score) {
        score.points = points;
      } else {
        score = this.scoreRepository.create({ user, quiz, points });
      }

      const savedScore = await this.scoreRepository.save(score);
      return { success: true, score: savedScore };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error creating score' };
    }
  }

  async getScoresByUser(userId: number) {
    try {
      return await this.scoreRepository.find({
        where: { user: { id: userId } },
        relations: ['quiz', 'user', 'quiz.level'],
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getScoreByUserAndQuiz(userId: number, quizId: number) {
    try {
      return await this.scoreRepository.findOne({
        where: { user: { id: userId }, quiz: { id: quizId } },
        relations: ['quiz', 'user', 'quiz.level'],
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateScore(scoreId: number, newPoints: number) {
    try {
      const score = await this.scoreRepository.findOneBy({ id: scoreId });
      if (!score) return { success: false, message: 'Score not found' };

      score.points = newPoints;
      const updatedScore = await this.scoreRepository.save(score);
      return { success: true, score: updatedScore };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error updating score' };
    }
  }

  async deleteScore(scoreId: number) {
    try {
      const result = await this.scoreRepository.delete({ id: scoreId });
      if (result.affected === 0) return { success: false, message: 'Score not found' };
      return { success: true, message: 'Score deleted successfully' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error deleting score' };
    }
  }

  // Calculate score from quiz questions and given answers, then create/update Score
  async calculateAndSaveScore(userId: number, quizId: number, answers: number[]) {
    try {
      // Validate user
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) return { success: false, message: 'User not found', score: 0 };

      // Load quiz with questions
      const quiz = await this.quizRepository.findOne({
        where: { id: quizId },
        relations: ['questions'],
      });
      if (!quiz) return { success: false, message: 'Quiz not found', score: 0 };

      // Sort questions by id to ensure deterministic order
      const sortedQuestions = quiz.questions.sort((a, b) => a.id - b.id);

      // Compute points
      let points = 0;
      sortedQuestions.forEach((q, index) => {
        const correct = q.correctAnswer ? q.correctAnswer.trim().toUpperCase() : '';
        const correctIndex = correct ? correct.charCodeAt(0) - 65 : -1; // A->0
        const userAnswer = answers[index];
        if (userAnswer === correctIndex) points++;
      });

      // Create or update score
      let score = await this.scoreRepository.findOne({
        where: { user: { id: userId }, quiz: { id: quizId } },
      });
      if (score) {
        score.points = points;
      } else {
        score = this.scoreRepository.create({ user, quiz, points });
      }
      await this.scoreRepository.save(score);

      return { success: true, score: points };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error calculating score', score: 0 };
    }
  }
}
