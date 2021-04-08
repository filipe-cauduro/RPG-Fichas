import { decode } from 'jsonwebtoken';
import { postRefreshToken } from '../../services/user';

export const isTokenValid = (token: string) => {
    const exp = getTokenExpDate(token);

    if (!exp) return false;

    return new Date().getTime() < exp.getTime();
}

export const getTokenExpDate = (token: string): Date => {
    const decoded: any = decode(token);

    if (!decoded?.exp) return new Date();

    return new Date(decoded.exp * 1000);
}

export const refreshBearer = (
    token: string,
    callback: (
        res: {
            status: number;
            data: {
                bearer: string;
                refreshToken: string;
            }
        } | undefined) => void
) => {
    postRefreshToken(token).then(callback);
}