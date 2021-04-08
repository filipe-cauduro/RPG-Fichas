import { FC } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ConditionalRoute from "./components/conditionalRoute";
import Home from "./components/home";
import Login from "./components/login";
import NotFound from "./components/notFound";
import Register from "./components/register";

const Routes: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <ConditionalRoute exact path="/login" conditionType="IS_NOT_AUTH" redirectTo="/home">
                    <Login />
                </ConditionalRoute>
                <ConditionalRoute exact path="/register" conditionType="IS_NOT_AUTH" redirectTo="/home">
                    <Register />
                </ConditionalRoute>
                <ConditionalRoute exact path="/home" conditionType="IS_AUTH" redirectTo="/login">
                    <Home />
                </ConditionalRoute>
                <ConditionalRoute exact path="/" conditionType="IS_AUTH" redirectTo="/login">
                    <Redirect to="/home" />
                </ConditionalRoute>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;