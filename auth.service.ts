/* import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    login(user:any){
        const{email,password} = user;
        if(email=== "test@test@gmail.com" && password==="test123"){
            return{
                success:true,
                message:"logged successfuly",
            }
        }else{
             return{
                success:false,
                message:"login failed !",
            }
  
        }
    }
}
  */

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // ======================
  // LOGIN
  // ======================
  async login(user: { email: string; password: string }) {
    const { email, password } = user;

    // 1. chercher l'utilisateur
    const existingUser = await this.usersService.findByEmail(email);

    if (!existingUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    // 2. vérifier le mot de passe
    if (existingUser.password !== password) {
      return {
        success: false,
        message: 'Wrong password',
      };
    }

    // 3. succès
    return {
      success: true,
      message: 'Login successful',
      user: {
        id: existingUser.id,
        nom: existingUser.nom,
        email: existingUser.email,
      },
    };
  }

  // ======================
  // SIGNUP
  // ======================
  async signup(user: { nom: string; email: string; password: string }) {
    return this.usersService.signup(user);
  }
}

