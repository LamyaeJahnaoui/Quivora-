import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { Level } from '../../levels/entities/level.entity';
import { Score } from '../../scores/entities/score.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  // Numéro du quiz DANS un niveau (1, 2, 3)
  @Column()
  quizNumber: number;

  @Column({ length: 100 })
  title: string;

  // 1 Quiz → plusieurs Questions
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  // Plusieurs quizzes → 1 level
  @ManyToOne(() => Level, (level) => level.quizzes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'levelId' }) //  IMPORTANT
  level: Level;

  // 1 Quiz → plusieurs Scores
  @OneToMany(() => Score, (score) => score.quiz)
  scores: Score[];

  @CreateDateColumn()
  createdAt: Date;
}
