import { hash, compare } from 'bcrypt';

const rounds = parseInt(process.env.PASSWORD_HASH_ROUNDS);

export const encryptPassword = async (password: string): Promise<string> => {
    return await hash(password, rounds);
}

export const compareEncriptedPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await compare(password, hashedPassword);
}