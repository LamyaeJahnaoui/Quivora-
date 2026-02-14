import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Quiz } from '../quizzes/entities/quiz.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  // ==========================
  // CREATE A QUESTION
  // ==========================
  async createQuestion(quizId: number, data: { text: string; correctAnswer: string }) {
    const quiz = await this.quizRepository.findOneBy({ id: quizId });

    if (!quiz) {
      return { success: false, message: 'Quiz not found' };
    }
const question = this.questionRepository.create({
  text: data.text,
  correctAnswer: data.correctAnswer, // conversion string A/B/C
  quiz: quiz,
});

    const savedQuestion = await this.questionRepository.save(question);

    return {
      success: true,
      message: 'Question created successfully',
      question: savedQuestion,
    };
  }

  // ==========================
  // GET ALL QUESTIONS FOR A QUIZ
  // ==========================
  async getQuestionsByQuiz(quizId: number) {
    return this.questionRepository.find({
      where: { quiz: { id: quizId } },
      relations: ['quiz'],
    });
  }

  // ==========================
  // GET A SINGLE QUESTION BY ID
  // ==========================
  async getQuestionById(id: number) {
    return this.questionRepository.findOne({
      where: { id },
      relations: ['quiz'],
    });
  }

  // ==========================
  // UPDATE A QUESTION
  // ==========================
  async updateQuestion(id: number, data: { text?: string; correctAnswer?: string }) {
  const question = await this.questionRepository.findOneBy({ id });

  if (!question) {
    return { success: false, message: 'Question not found' };
  }

  if (data.text !== undefined) question.text = data.text;
  if (data.correctAnswer !== undefined) question.correctAnswer = data.correctAnswer; // string A/B/C

  const updatedQuestion = await this.questionRepository.save(question);

  return { success: true, message: 'Question updated', question: updatedQuestion };
}

  // ==========================
  // DELETE A QUESTION
  // ==========================
  async deleteQuestion(id: number) {
    const result = await this.questionRepository.delete(id);

    if (result.affected === 0) {
      return { success: false, message: 'Question not found' };
    }

    return { success: true, message: 'Question deleted' };
  }
}
