import { post } from '../../utilities/http';
import { apiPort, apiUrl } from '../../config.json';

const endpointRoute = `${apiUrl}:${apiPort}/user`;

export const postRegister = async (name: string, email: string, password: string, confirmPassword: string) => {
    const res = await post(`${endpointRoute}/register`,
        {
            name,
            email,
            password,
            confirmPassword
        }
    );

    return res;
}

export const postLogin = async (email: string, password: string) => {
    const res: undefined | {
        status: number;
        data: {
            message: string;
            bearer?: string;
            refreshToken?: string;
        }
    } = await post(`${endpointRoute}/login`,
        {
            email,
            password
        }
    );

    return res;
}

export const postRefreshToken = async (token: string) => {
    const res: undefined | {
        status: number;
        data: { bearer: string; refreshToken: string; }
    } = await post(`${endpointRoute}/refreshToken`, { token });

    return res;
}