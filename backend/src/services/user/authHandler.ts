import { verify } from "jsonwebtoken";
import User from "../../entity/User";
import { getOrCreateManager } from "../database/connectionManager";

interface IPlayload {
    id: number;
    version: number;
    exp: number;
}

export async function authHandler(token: string): Promise<boolean> {
    let payload: any;
    
    try {
        payload = verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return false;
    }

    if (payload instanceof String) return false;

    const {id, version, exp}: IPlayload = payload;

    const manager = await getOrCreateManager();

    const usr = await manager.findOne(User, id);

    if (!usr) return false;

    if (usr.tokenVersion !== version) false;

    return true;
}