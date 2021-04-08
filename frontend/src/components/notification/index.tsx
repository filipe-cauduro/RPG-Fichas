import { FC, ReactNode, useContext, useEffect, useState } from "react";
import NotificationHubContext from "../../context/notificationHubProvider";
import { Container, Header, P, Progress, TextArea, CloseButton } from "./styles";

export interface NotificationComponentProps {
    type: "SUCCESS" | "ERROR" | "WARNING";
}

interface Props extends NotificationComponentProps{
    children: ReactNode;
    id: string;
}

const Notification: FC<Props> = ({ type, children, id }) => {
    const [progress, setProgress] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
    const [exit, setExit] = useState<boolean>(false);

    const {dispatcher} = useContext(NotificationHubContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { startTimer() }, []);

    const startTimer = () => {
        const intervalTimer = setInterval(() => {
            setProgress(prev => {
                if (prev < 100)
                    return prev + 1;

                closeNotification();
                return prev;
            });
        }, 50);
        setTimer(intervalTimer);
    };

    const clearTimer = () => {
        clearInterval(timer!);
    };

    const closeNotification = () => {
        setExit(true);
        clearTimer();
        setTimeout(() => {
            dispatcher(
                {
                    type: "REMOVE_NOTIFICATION",
                    id
                }
            );
        }, 400);
    }

    return (
        <Container type={type} exit={exit} onMouseEnter={clearTimer} onMouseLeave={startTimer}>
            <TextArea>
                <P>{children}</P>
                <Header>
                    <CloseButton onClick={closeNotification}/>
                </Header>
            </TextArea>
            <Progress type={type} style={{ width: `${progress}%` }} />
        </Container>
    );
}

export default Notification;