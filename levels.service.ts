import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async getAllLevels() {
    return this.levelRepository.find({ relations: ['quizzes'] });
  }

  async getLevelById(id: number) {
    return this.levelRepository.findOne({ where: { id }, relations: ['quizzes'] });
  }
}
