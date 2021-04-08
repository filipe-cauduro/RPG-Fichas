import { Router } from "express";
import {
    registerHandle, IRegisterParams,
    loginHandle, ILoginParams, refreshBearerHandle
} from "../../services/user";

export const baseRoute = "/user";
const router = Router({ strict: true });

router.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword }: IRegisterParams = req.body;
    
    if (!name || !email || !password || !confirmPassword)
        return res.status(500).send(JSON.stringify({ message: "É obrigatório informar todos os campos para registro!", error: "Field undefined." }));

    const { status, message, error } = await registerHandle({ name, email, password, confirmPassword });

    res.status(status).send(JSON.stringify({ message, error }));
});

router.post("/login", async (req, res) => {
    const { email, password }: ILoginParams = req.body;
    if (!email || !password)
        return res.status(500).send(JSON.stringify({ message: "É obrigatório informar todos os campos para efetuar login!", error: "Field undefined." }));

    const { status, message, error, bearer, refreshToken } = await loginHandle({ email, password });

    res.status(status).send(JSON.stringify({ message, bearer, refreshToken, error }));
});

router.post("/refreshToken", async (req, res) => {
    const token: string = req.body.token;

    if (!token) res.status(500).send();

    const { status, bearer, refreshToken } = await refreshBearerHandle(token);

    res.status(status).send(JSON.stringify({bearer, refreshToken}));
});

export default router;