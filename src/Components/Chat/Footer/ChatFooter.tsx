import { FC, useCallback } from "react";
import { postMessage } from "../../../api/postMessage";
import "./styles.css";

type ChatFooter = {
    textMessage: string;
    setTextMessage: (params: string) => void;
    chatId: string;
    idInstance: any;
    apiTokenInstance: any;
    setSendMessage: (params: boolean) => void;
};

export const ChatFooter: FC<ChatFooter> = ({
    textMessage,
    setTextMessage,
    chatId,
    idInstance,
    apiTokenInstance,
    setSendMessage,
}) => {
    const sendMessage = useCallback(() => {
        postMessage(
            idInstance,
            apiTokenInstance,
            chatId,
            textMessage,
            setSendMessage
        );
    }, [idInstance, apiTokenInstance, chatId, textMessage]);

    return (
        <div className="ChatFooter">
            <input
                className="inputChat"
                type="text"
                placeholder="Введите текст"
                value={textMessage}
                onChange={(event) => setTextMessage(event.target.value)}
            />
            <button className="buttonChat" onClick={() => sendMessage()}>
                Send
            </button>
        </div>
    );
};
