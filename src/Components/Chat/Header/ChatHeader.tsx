import { FC } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

type ChatHeader = {
    phoneNumber: string;
    setHideState: (params: string) => void;
    idInstance: any;
    apiTokenInstance: any;
};

export const ChatHeader: FC<ChatHeader> = ({
    phoneNumber,
    setHideState,
    idInstance,
    apiTokenInstance,
}) => {
    return (
        <div className="ChatHeader">
            <div className="numberDiv">{phoneNumber}</div>
            <button
                className="phoneButton"
                onClick={() => setHideState("visible")}
            >
                &#9998;
            </button>

            <Link
                className="LogoutButton"
                to="/"
                state={{ idInstance, apiTokenInstance }}
            >
                Logout
            </Link>
        </div>
    );
};
