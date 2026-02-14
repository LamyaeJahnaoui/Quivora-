
 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ==========================
  // CREATE USER (SIGNUP)
  // ==========================
  async signup(data: { nom: string; email: string; password: string }) {
    // 1️Vérification que tous les champs sont remplis
    if (!data.nom || !data.email || !data.password) {
      return {
        success: false,
        message: 'Tous les champs sont obligatoires',
      };
    }

    // 2️ Vérifier le format email (accept most normal emails)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: 'L’email n\'est pas valide',
      };
    }

    // 3️ Vérifier si l’utilisateur existe déjà
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      return {
        success: false,
        message: 'L’utilisateur existe déjà',
      };
    }

    // 4️ Créer l’utilisateur
    const user = this.userRepository.create({
      nom: data.nom,
      email: data.email,
      password: data.password, // plus tard : hasher le mot de passe
    });

    try {
      const savedUser = await this.userRepository.save(user);
      return {
        success: true,
        message: 'Utilisateur créé avec succès',
        user: savedUser,
      };
    } catch (err) {
      // Return a readable error for the frontend while logging details can be added later
      return {
        success: false,
        message: 'Erreur interne lors de la création de l\'utilisateur',
        error: err?.message || String(err),
      };
    }
  }

  // ==========================
  // FIND BY EMAIL
  // ==========================
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  // ==========================
  // FIND BY ID
  // ==========================
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  // ==========================
  // GET ALL USERS
  // ==========================
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}

