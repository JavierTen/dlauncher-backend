import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10); // 10 es el factor de coste
    }

    async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, hashedPassword);
    }
}
