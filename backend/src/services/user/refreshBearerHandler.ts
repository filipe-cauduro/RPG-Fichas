import { sign, verify } from "jsonwebtoken";
import User from "../../entity/User";
import { getOrCreateManager } from "../database/connectionManager";

interface IRefreshTokenResult {
    status: number;
    bearer?: string;
    refreshToken?: string;
}

interface IPlayload {
    id: number;
    version: number;
    exp: number;
}

export async function refreshBearerHandler(token: string): Promise<IRefreshTokenResult> {
    let payload: any;
    
    try {
        payload = verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        return { status: 500 };
    }

    if (payload instanceof String) return { status: 500 };

    const {id, version, exp}: IPlayload = payload;

    const manager = await getOrCreateManager();

    const usr = await manager.findOne(User, id);

    if (!usr) return { status: 500 }

    if (usr.refreshTokenVersion !== version) return { status: 500 };

    usr.tokenVersion += 1;
    manager.save(usr);

    const bearer = sign({ id: usr.id, version: usr.tokenVersion }, process.env.JWT_SECRET, { expiresIn: 5 });
    const refreshToken = sign({ id: usr.id, version: usr.refreshTokenVersion }, process.env.JWT_REFRESH_SECRET, { expiresIn: 1800 });

    return { status: 200, bearer, refreshToken };
}