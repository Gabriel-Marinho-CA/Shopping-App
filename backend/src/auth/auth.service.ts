import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userDTO } from 'src/dto/authDTO';
import { ComparePasswords, EncodePassword } from 'src/utils/bcrypt';
import { RegisterException } from 'src/utils/expections';

//auth.service.ts
@Injectable()
export class AuthService {
    
    private users: userDTO[] = [];

    constructor(private JwtService: JwtService) { }

    async sigIn(signInUser: userDTO): Promise<userDTO | undefined> {
        const getUser = this.users.find(userDB => userDB.email === signInUser.email);

        if (!ComparePasswords(signInUser.password, getUser.password)) {
            throw new UnauthorizedException();
        }

        return getUser;
    }
    async register(registerUser: userDTO) {

        const existUser = await this.handleExistUser(registerUser);

        if (!existUser) {
            const encodePassword = EncodePassword(registerUser.password)
            const userWithEncryptPass = { ...registerUser, password: encodePassword };

            this.users.push(userWithEncryptPass);

            const bb = { acess_token: await this.JwtService.signAsync(userWithEncryptPass)}

            console.log(bb);
            
            return bb
        }

        throw new RegisterException();
    }

    async handleExistUser(user: userDTO) {
        return this.users.find(existUser => existUser.email == user.email);
    }
}
