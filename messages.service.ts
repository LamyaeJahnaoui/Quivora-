import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async sendMessage(data: { email: string; subject: string; content: string }) {
    // vérifier que l'utilisateur existe
    const user = await this.userRepo.findOneBy({ email: data.email });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const message = this.messageRepo.create({
      subject: data.subject,
      content: data.content,
      user,
    });

    const saved = await this.messageRepo.save(message);

    return { success: true, message: 'Message sent successfully', data: saved };
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepo.find({ relations: ['user'] });
  }
}
