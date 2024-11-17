import { userDTO } from 'src/dto/authDTO';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants/contants';


//auth.controller.ts
@Controller('api')
export class AuthController {

    constructor(private readonly authService: AuthService) {

    }
    @Public()
    @Post('/login')
    login(@Body() signInUser: userDTO) {
        return this.authService.sigIn(signInUser);
    }
    @Public()
    @Post('/register')
    register(@Body() registerUser: userDTO) {
        return this.authService.register(registerUser)
    }
}
