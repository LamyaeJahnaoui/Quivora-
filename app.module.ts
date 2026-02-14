import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RankingModule } from './ranking/ranking.module';
import { ScoresModule } from './scores/scores.module';
import { QuizzesModule } from './quizzes/quizzes.module';

import { TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/entities/user.entity";
import { MessagesModule } from './messages/messages.module';
import { LevelsModule } from './levels/levels.module';
import { QuestionsModule } from './questions/questions.module';


@Module({
  imports: [
    //configuration db
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgre',
      database: 'QuizApp',
      autoLoadEntities: true,
      synchronize: false, //DEV only "a retenir "
    }),
    AuthModule, UsersModule, QuizzesModule, RankingModule, ScoresModule, MessagesModule, LevelsModule, QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
