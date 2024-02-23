export interface SignUpInterface {
    signUp(data: SignUpInterface.Request): Promise<void>;
}

export namespace SignUpInterface {
    export type Request = {
        email: string;
        password: string;
    };
    export type Response = void;
}
