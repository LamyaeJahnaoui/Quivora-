import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  content: string; // le texte du message

  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  user: User; // l'utilisateur qui envoie le message

  @CreateDateColumn()
  createdAt: Date;
}
