import React, { createContext } from "react";
import {ActionNotify, ActionRemove} from "../components/notificationHub";

const NotificationHubContext = createContext({ dispatcher: {} as React.Dispatch<ActionNotify | ActionRemove> });
export default NotificationHubContext;