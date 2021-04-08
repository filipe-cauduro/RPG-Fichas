import { FC, ReactNode } from "react";
import { useCookies } from "react-cookie";
import { Redirect, Route } from "react-router";
import { isTokenValid, refreshBearer, getTokenExpDate } from "../../utilities/token";

interface ConditionalRouteProps {
    exact?: boolean;
    path: string
    conditionType: "IS_AUTH" | "IS_NOT_AUTH";
    redirectTo: string;
    children: ReactNode;
}

const ConditionalRoute: FC<ConditionalRouteProps> = ({ conditionType, redirectTo, path, exact, children }) => {

    const [cookies, setCookies] = useCookies(["bearer", "token"]);

    const isAuth = () => {
        const isBearer = isTokenValid(cookies.bearer);
        if (isBearer) return isBearer;

        const isToken = isTokenValid(cookies.token);
        if (isToken) {
            if (!isBearer) refreshBearer(cookies.token, refreshBearerCallback);
            return isToken;
        }

        return false;
    }

    const getCondition = (): boolean => {
        switch (conditionType) {
            case "IS_AUTH":
                return isAuth();
            case "IS_NOT_AUTH":
                return !isAuth();
        }
    }

    const refreshBearerCallback = (res: { status: number; data: { bearer: string; refreshToken: string; } } | undefined) => {
        if (!res) return;
        setCookies("bearer", res.data.bearer, { path: "/", expires: getTokenExpDate(res.data.bearer) });
        setCookies("token", res.data.refreshToken, { path: "/", expires: getTokenExpDate(res.data.refreshToken) });
    }

    return (
        <Route
            exact={exact}
            path={path}
            render={props =>
                getCondition() ?
                    children :
                    <Redirect to={{ pathname: redirectTo, state: props.location }} />
            }
        />
    );
}

export default ConditionalRoute;