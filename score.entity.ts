import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation ManyToOne vers Quiz
  @ManyToOne(() => Quiz, (quiz) => quiz.scores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  // Relation ManyToOne vers User
  @ManyToOne(() => User, (user) => user.scores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  // Points obtenus dans le quiz
  @Column({ type: 'int', default: 0 })
  points: number;

  @CreateDateColumn()
  createdAt: Date;
}
