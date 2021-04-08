import { FC, useReducer } from 'react';
import { v4 } from 'uuid';
import NotificationHubContext from '../../context/notificationHubProvider';
import Notification, { NotificationComponentProps } from '../notification';
import { Container } from './style';

interface NotificationProps extends NotificationComponentProps {
    id?: string;
    message: string;
}

export interface ActionNotify {
    type: "NOTIFY";
    payload: NotificationProps;
}

export interface ActionRemove {
    type: "REMOVE_NOTIFICATION";
    id: string;
}

const NotificationsHub: FC = ({ children }) => {

    function reducer(state: NotificationProps[], action: ActionNotify | ActionRemove) {
        switch (action.type) {
            case "NOTIFY":
                action.payload.id = v4();
                return [...state, action.payload];
            case "REMOVE_NOTIFICATION":
                const newState = state.filter(x => x.id !== action.id);
                if (newState) return newState;
                return [];
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, new Array<NotificationProps>());

    return (
        <NotificationHubContext.Provider value={{dispatcher: dispatch}}>
            <Container>
                {
                    state.map(x => <Notification key={x.id} id={x.id!} type={x.type}>{x.message}</Notification>)
                }
            </Container>
            {children}
        </NotificationHubContext.Provider>
    );
}

export default NotificationsHub;