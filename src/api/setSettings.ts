
export const setSettings = async (idInstance: any, apiTokenInstance: any) => {
    let url = `https://api.green-api.com/waInstance${idInstance}/SetSettings/${apiTokenInstance}`;
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            webhookUrl: "",
            outgoingWebhook: "yes",
            stateWebhook: "yes",
            incomingWebhook: "yes",
        }),
    });
}