import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Quiz } from '../../quizzes/entities/quiz.entity';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Level 1, Level 2, Level 3

  @OneToMany(() => Quiz, (quiz) => quiz.level)
  quizzes: Quiz[];
}
