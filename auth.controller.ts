import { Controller,Post,Body } from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() user:any){
        return this.authService.login(user);
    }

    // Expose signup via /auth/signup as a convenience for the frontend
    @Post('signup')
    signup(@Body() user: any) {
        return this.authService.signup(user);
    }
}
