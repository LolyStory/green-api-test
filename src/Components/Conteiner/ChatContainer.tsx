import { FC, useCallback, useEffect, useState } from "react";
import { getMessage } from "../../api/getMessage";
import { ChatWindow } from "../Chat/MainChat/chatWindow";

type ChatContainer = {
    idInstance: any;
    apiTokenInstance: any;
    textMessage: string;
    setTextMessage: (params: string) => void;
    sendMessage: boolean;
    setSendMessage: (params: boolean) => void;
    chatId: string;
    clearHistory: boolean;
    setClearHistory: (params: boolean) => void;
};

export const ChatContainer: FC<ChatContainer> = ({
    idInstance,
    apiTokenInstance,
    textMessage,
    setTextMessage,
    sendMessage,
    setSendMessage,
    chatId,
    clearHistory,
    setClearHistory,
}) => {
    const [messages, setMessages] = useState<string[][] | null>(null);

    const polingMessages = useCallback(() => {
        getMessage(idInstance, apiTokenInstance)
            .then((data) => {
                console.log(data);
                if (data?.body?.senderData?.sender === chatId) {
                    if (data.body?.messageData?.textMessageData?.textMessage) {
                        if (messages !== null) {
                            const currenMessages = messages.slice(0);
                            currenMessages.unshift([
                                data.body?.messageData?.textMessageData
                                    ?.textMessage,
                                "interlocutor",
                            ]);
                            setMessages(currenMessages);
                        } else {
                            setMessages([
                                [
                                    data.body?.messageData?.textMessageData
                                        ?.textMessage,
                                    "interlocutor",
                                ],
                            ]);
                        }
                    }
                }
            })
            .finally(() => {
                polingMessages();
            });
    }, []);

    useEffect(() => {
        polingMessages();
    }, []);

    useEffect(() => {
        if (sendMessage) {
            if (messages !== null) {
                const currenMessages = messages.slice(0);
                currenMessages.unshift([textMessage, "me"]);
                setMessages(currenMessages);
            } else {
                setMessages([[textMessage, "me"]]);
            }
            setTextMessage("");
            setSendMessage(false);
        }
    }, [sendMessage]);

    useEffect(() => {
        if (clearHistory === true) {
            setMessages(null);
            setClearHistory(false);
        }
    }, [clearHistory]);

    return <ChatWindow messages={messages} />;
};
