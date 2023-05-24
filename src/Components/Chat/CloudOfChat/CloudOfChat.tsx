import { FC } from "react";
import "./styles.css";

type CloudOfChat = {
    text: string;
    person: string;
};

export const CloudOfChat: FC<CloudOfChat> = ({ text, person }) => {
    return <div className={`cloudChat ${person}`}>{text}</div>;
};
