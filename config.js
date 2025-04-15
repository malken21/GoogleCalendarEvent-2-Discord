// Google カレンダーの ID
const CALENDAR_ID = "CALENDAR_ID";

// Discord の Webhook の URL
const DISCORD_WEBHOOK_URL = "DISCORD_WEBHOOK_URL";

// Discordに送信される payload
// イベントのプロパティは下記のドキュメントを参照してください
// https://developers.google.com/apps-script/reference/calendar/calendar-event
const payload = event => {
    return {
        "content": `${event.getTitle()}`
    }
}