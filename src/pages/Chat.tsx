import { FC, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChatFooter } from "../Components/Chat/Footer/ChatFooter";
import { ChatHeader } from "../Components/Chat/Header/ChatHeader";
import "./styles.css";
import { ChatContainer } from "../Components/Conteiner/ChatContainer";
import { setSettings } from "../api/setSettings";

export const ChatWindow: FC = () => {
    const location = useLocation();
    const idInstance = location.state.idInstance;
    const apiTokenInstance = location.state.apiTokenInstance;

    const [phoneNumber, setPhoneNumber] = useState("");
    const [textMessage, setTextMessage] = useState("");
    const [hideState, setHideState] = useState("visible");
    const [sendMessage, setSendMessage] = useState(false);
    const [clearHistory, setClearHistory] = useState(false);

    const chatId = `${phoneNumber}@c.us`;

    const login = useCallback(async () => {
        setSettings(idInstance, apiTokenInstance);
    }, [idInstance, apiTokenInstance]);

    return (
        <div className="chat">
            <div className={`EnterNumberWindow ${hideState}`}>
                <div className="textDiv">Enter phone number to chat:</div>
                <input
                    className="inputPhone"
                    type="text"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <button
                    className="PhoneButton"
                    onClick={() => {
                        login();
                        setHideState("invisible");
                        setClearHistory(true);
                    }}
                >
                    Accept
                </button>
            </div>
            <ChatHeader
                phoneNumber={phoneNumber}
                setHideState={setHideState}
                idInstance={idInstance}
                apiTokenInstance={apiTokenInstance}
            />

            <ChatContainer
                idInstance={idInstance}
                apiTokenInstance={apiTokenInstance}
                textMessage={textMessage}
                setTextMessage={setTextMessage}
                sendMessage={sendMessage}
                setSendMessage={setSendMessage}
                chatId={chatId}
                clearHistory={clearHistory}
                 setClearHistory={setClearHistory}
            />

            <ChatFooter
                textMessage={textMessage}
                setTextMessage={setTextMessage}
                chatId={chatId}
                idInstance={idInstance}
                apiTokenInstance={apiTokenInstance}
                setSendMessage={setSendMessage}
            />
        </div>
    );
};
