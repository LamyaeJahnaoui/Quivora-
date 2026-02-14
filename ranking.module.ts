
import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from '../scores/entities/score.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score, User])
  ],
  providers: [RankingService],
  controllers: [RankingController],
})
export class RankingModule {}
