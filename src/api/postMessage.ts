

export const postMessage = (idInstance: any, apiTokenInstance: any, chatId: string, textMessage: string, setSendMessage: (params: boolean) => void,) => {
    const urlPost = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    fetch(urlPost, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            chatId: chatId,
            message: textMessage,
        }),
    }).then(() => setSendMessage(true));

}