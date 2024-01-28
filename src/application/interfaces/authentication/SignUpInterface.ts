export interface SignUpInterface {
    signUp(data: SignUpInterface.Request): Promise<SignUpInterface.Response>;
}

export namespace SignUpInterface {
    export type Request = {
        email: string;
        password: string;
    };
    export type Response = void;
}
