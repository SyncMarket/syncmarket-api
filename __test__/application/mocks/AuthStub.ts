/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignInInterface, SignUpInterface } from '@application/interfaces';

export class AuthStub implements SignUpInterface, SignInInterface {
    async signUp(data: SignUpInterface.Request): Promise<void> {}

    async signIn(
        data: SignInInterface.Request,
    ): Promise<SignInInterface.Response> {
        return {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
        };
    }
}
