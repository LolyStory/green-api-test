import { FC, useCallback, useEffect, useRef, useState } from "react";
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
    const [dataTemp, setDataTemp] = useState<any | null>(null);
    const effectFixFlag = useRef(true);

    const polingMessages = useCallback(async () => {
        getMessage(idInstance, apiTokenInstance)
            .then((data) => {
                setDataTemp(data);
            })
            .finally(() => polingMessages());
    }, [getMessage, idInstance, apiTokenInstance]);

    useEffect(() => {
        if (dataTemp?.body?.senderData?.sender === chatId) {
            if (dataTemp.body?.messageData?.textMessageData?.textMessage) {
                if (messages !== null) {
                    const currenMessages = messages.slice(0);
                    currenMessages.unshift([
                        dataTemp.body?.messageData?.textMessageData
                            ?.textMessage,
                        "interlocutor",
                    ]);
                    setMessages(currenMessages);
                    setDataTemp(null);
                } else {
                    setMessages([
                        [
                            dataTemp.body?.messageData?.textMessageData
                                ?.textMessage,
                            "interlocutor",
                        ],
                    ]);
                    setDataTemp(null);
                }
            }
        }
    }, [dataTemp]);

    useEffect(() => {
        if (effectFixFlag.current) {
            effectFixFlag.current = false;
            polingMessages();
        }
    }, [effectFixFlag]);

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
