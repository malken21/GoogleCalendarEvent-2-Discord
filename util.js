function sendDiscordWebhook(event) {
    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload(event))
    };
    UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, options);
}