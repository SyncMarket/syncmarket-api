import { SignInInterface, SignUpInterface } from '@application/interfaces';
import { ENV } from '@core/config';
import axios from 'axios';

export class AuthProvider implements SignInInterface, SignUpInterface {
    private readonly baseUrl: string;
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly audience: string;
    private readonly connection: string;

    constructor() {
        this.baseUrl = ENV.AUTH0_BASE_URL;
        this.clientId = ENV.AUTH0_CLIENT_ID;
        this.clientSecret = ENV.AUTH0_CLIENT_SECRET;
        this.audience = ENV.AUTH0_AUDIENCE;
        this.connection = ENV.AUTH0_CONNECTION;
    }

    public async signUp(data: SignUpInterface.Request): Promise<void> {
        await axios.post(
            `${this.baseUrl}/dbconnections/signup`,
            {
                clientId: this.clientId,
                connection: this.connection,
                audiance: this.audience,
                email: data.email,
                password: data.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    public async signIn(
        data: SignInInterface.Request,
    ): Promise<SignInInterface.Response> {
        const response = await axios.post(
            `${this.baseUrl}/oauth/token`,
            {
                grant_type: 'password',
                username: data.email,
                password: data.password,
                audience: this.audience,
                scope: 'offline_access',
                client_id: this.clientId,
                client_secret: this.clientSecret,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
        };
    }
}
