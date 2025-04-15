function getEventsSinceLastRun() {
    // スクリプトプロパティサービスを取得
    const scriptProperties = PropertiesService.getScriptProperties();

    // 前回実行時間をスクリプトプロパティから取得
    const lastRunTime = scriptProperties.getProperty('lastRunTime');
    let startTime;

    if (lastRunTime) {
        startTime = new Date(lastRunTime);
    } else {
        // 初回実行時は過去1週間のイベントを取得
        startTime = new Date();
        startTime.setDate(startTime.getDate() - 7);
    }

    // 現在時刻を取得
    const now = new Date();

    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    // 指定期間のイベントを取得
    calendar.getEvents(startTime, now).forEach(event => {
        Logger.log(`Title: ${event.getTitle()}`);
        sendDiscordWebhook(event);
    });

    // 現在時刻をスクリプトプロパティに保存
    scriptProperties.setProperty('lastRunTime', now.toISOString());
    Logger.log('次回の実行のために現在時刻を保存しました。');
}