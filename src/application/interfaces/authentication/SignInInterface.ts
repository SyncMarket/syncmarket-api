export interface SignInInterface {
    signIn(data: SignInInterface.Request): Promise<SignInInterface.Response>;
}

export namespace SignInInterface {
    export type Request = {
        email: string;
        password: string;
    };
    export type Response = {
        accessToken: string;
        refreshToken: string;
    };
}
