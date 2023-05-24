

export const getMessage = async (idInstance: any, apiTokenInstance: any) => {
    const urlGet = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

    const notification = (
        await fetch(urlGet, {
            method: "GET",

        })
    ).json().then(
        async (value) => {
            if (value !== null) {
                const receiptId = String(value["receiptId" as keyof typeof value]);
                const urlDelete = `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
                await fetch(urlDelete, {
                    method: "DELETE",
                })
            }
            return value;
        }
    )


    return notification;
}