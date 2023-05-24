import { FC } from "react";
import "./styles.css";
import { CloudOfChat } from "../CloudOfChat/CloudOfChat";

type ChatWindow = {
    messages: string[][] | null;
};

export const ChatWindow: FC<ChatWindow> = ({ messages }) => {
    return (
        <div className="scroleble">
            <div className="ChatWindow ">
                {messages?.map(([text, person], index) => (
                    <CloudOfChat text={text} person={person} key={index} />
                ))}
            </div>
        </div>
    );
};
