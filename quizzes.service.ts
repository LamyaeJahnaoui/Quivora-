

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  // START QUIZ
  async startQuiz(level: number, quizId: number) {
    const quiz = await this.quizRepository.findOne({
      where: { quizNumber: quizId, level: { id: level } },
      relations: ['questions'],
    });

    if (!quiz) return { error: 'Quiz not found' };

    return { question: quiz.questions[0], currentIndex: 0, finished: false };
  }

  // GET QUESTIONS
  async getQuestionsByQuiz(quizId: number) {
    const quiz = await this.quizRepository.findOne({
      where: { id: quizId },
      relations: ['questions'],
      relationLoadStrategy: 'query',
    });
    
    if (!quiz) return [];
    
    // Sort questions by ID to ensure consistent order
    const sortedQuestions = quiz.questions.sort((a, b) => a.id - b.id);
    return sortedQuestions;
  }

  // GET QUESTIONS BY LEVEL + QUIZ NUMBER
  async getQuestionsByLevelAndNumber(level: number, quizNumber: number) {
    const quiz = await this.quizRepository.findOne({
      where: { quizNumber: quizNumber, level: { id: level } },
      relations: ['questions'],
      relationLoadStrategy: 'query',
    });

    if (!quiz) return [];

    // Sort questions by ID to ensure consistent order
    const sortedQuestions = quiz.questions.sort((a, b) => a.id - b.id);
    return sortedQuestions;
  }

  // Get the quiz entity for a given level and quiz number (returns full quiz or null)
  async getQuizByLevelAndNumber(level: number, quizNumber: number) {
    const quiz = await this.quizRepository.findOne({
      where: { quizNumber: quizNumber, level: { id: level } },
    });
    return quiz || null;
  }

  // (score calculation moved to ScoresService)
}
