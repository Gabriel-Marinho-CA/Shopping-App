import { HttpException, HttpStatus } from "@nestjs/common";

export class RegisterException extends HttpException {
    constructor() {
        super('Already have a user with this email',HttpStatus.NOT_ACCEPTABLE);
    }
}