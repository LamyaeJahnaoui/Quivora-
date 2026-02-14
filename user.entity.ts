import { Entity, Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Score } from '../../scores/entities/score.entity';
import { Message } from '../../messages/entities/message.entity';
import { OneToMany } from 'typeorm';

@Entity("users")//table
export class User{
    @PrimaryGeneratedColumn() //cle primaire
    id: number;
     @Column()
    nom: string;
    @Column({ unique: true})
    email: string;
    @Column()
    password: string;

    @OneToMany(() => Score, (score) => score.user)
    scores: Score[];
    /* @Column()
    fullName: string;
    @Column()
    role: string;
    @CreateDateColumn()
    createdAt: Date;
 */
 
 @OneToMany(() => Message, (message) => message.user)
 messages: Message[];

    
}
