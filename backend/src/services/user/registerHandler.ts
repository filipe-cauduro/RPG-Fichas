import { getOrCreateManager } from "../database/connectionManager";
import User from "../../entity/User";
import { encryptPassword } from "../encrypt/encryptionManager";

export interface IRegisterParams {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface IRegisterResult {
    status: number;
    message?: string;
    error?: { code: string, message: string };
}

export async function registerHandler(
    { name, email, password, confirmPassword }: IRegisterParams
): Promise<IRegisterResult> {

    if (password !== confirmPassword)
        return {
            status: 500,
            message: "A senha e a senha de confirmação devem ser iguais!"
        };

    try {
        const encryptedPassword = await encryptPassword(password);
        const user = new User(name, email.toLowerCase(), encryptedPassword);
        const manager = await getOrCreateManager();
        await manager.save(user);
        if (!user.id)
            return {
                status: 500,
                message: "Houve um erro ao salvar os dados, tente novamente."
            };
    } catch (err) {
        return {
            status: 500,
            message: "Houve um erro ao salvar os dados, tente novamente.",
            error: { code: err.code, message: err.message }
        };
    }

    return {
        status: 201,
        message: "Registro efetuado com sucesso!"
    };
}