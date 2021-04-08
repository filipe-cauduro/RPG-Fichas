import { sign } from "jsonwebtoken";
import User from "../../entity/User";
import { getOrCreateManager } from "../database/connectionManager";
import { compareEncriptedPassword } from "../encrypt/encryptionManager";

export interface ILoginParams {
    email: string;
    password: string;
}

interface ILoginResult {
    status: number;
    message?: string;
    bearer?: string;
    refreshToken?: string;
    error?: Error;
}

export async function loginHandler({ email, password }: ILoginParams): Promise<ILoginResult> {
    const manager = await getOrCreateManager();

    const usr = await manager.findOne(User, {
        where: {
            email: email.toLowerCase()
        }
    });

    if (!usr || !await compareEncriptedPassword(password, usr.password))
        return { status: 500, message: "Login ou senha incorretos!" }


    usr.tokenVersion += 1;
    usr.refreshTokenVersion += 1;
    manager.save(usr);

    const bearer = sign({ id: usr.id, version: usr.tokenVersion }, process.env.JWT_SECRET, { expiresIn: 900 });
    const refreshToken = sign({ id: usr.id, version: usr.refreshTokenVersion }, process.env.JWT_REFRESH_SECRET, { expiresIn: 1800 });

    return { status: 200, message: "Login efetuado com sucesso!", bearer, refreshToken };
}