import { ConnectionNotFoundError, createConnection, getConnection } from "typeorm"

export const getOrCreateConnection = async () => {
    try {
        const connection = await getConnection();
        return connection;
    } catch (err) {
        if (err instanceof ConnectionNotFoundError) {
            const connection = await createConnection();
            return connection;
        } else {
            throw err;
        }
    }
}

export const getOrCreateManager = async () => {
    const connection = await getOrCreateConnection();
    return connection.manager;
}