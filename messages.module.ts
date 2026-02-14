import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([Message, User]), // on ajoute User si on veut vérifier l'email
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
  

})
export class MessagesModule {}
