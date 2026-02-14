import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Quiz } from '../../quizzes/entities/quiz.entity';


@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  correctAnswer: string; // A, B ou C

  @Column({ default: '' })
  optiona: string;

  @Column({ default: '' })
  optionb: string;

  @Column({ default: '' })
  optionc: string;


  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  quiz: Quiz;
}
