# GoogleCalendarEvent-2-Discord

Google カレンダーに新しいイベントがあった場合 Discord に通知する Google Apps Script

## 使い方

`code.js` にある `getEventsSinceLastRun()` を定期的に実行されるように設定してください。

`config.js` で `CALENDAR_ID` と `DISCORD_WEBHOOK_URL` を設定してください。
